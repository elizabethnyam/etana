import io from 'socket.io-client'
import base64url from 'base64url'

import { Cryptographer } from './Cryptographer.js'

class RendezvousClientSession {
  baseUrl
  session
  onMessage
  onSessionEnded
  cryptographer

  constructor ({
    baseUrl,
    onMessage,
    onSessionEnded,
    prng
  }) {
    this.baseUrl = baseUrl
    this.onMessage = onMessage
    this.onSessionEnded = onSessionEnded
    this.cryptographer = new Cryptographer(prng)
  }

  create = async () => {
    return new Promise((resolve, reject) => {
      try {
        const publicKey = base64url.encode(this.cryptographer.myPublicKey)

        this.session = io(`${this.baseUrl}/${publicKey}`)

        this.session.on('connect', () => {
          console.log('Established new session with Rendezvous service')
        })

        this.session.on('message', msg => {
          const response = this.cryptographer.decrypt(msg)
          console.log('Encrypted response from Rendezvous service:', response)
          this.end()
          this.onMessage && this.onMessage(response)
        })

        this.session.on('publicKey', encodedPublicKey => {
          console.log('Received session public key from Rendezvous service:', encodedPublicKey)
          const { publicKey } = JSON.parse(base64url.decode(encodedPublicKey))
          console.log('Decoded session publicKey:', publicKey)

          this.cryptographer.theirPublicKey = base64url.toBuffer(publicKey)

          resolve()
        })

        this.session.on('disconnect', reason => {
          this.onSessionEnded && this.onSessionEnded(reason)
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  sendSessionPublicKey = socket => {
    const message = {
      publicKey: base64url.encode(this.cryptographer.myPublicKey)
    }

    socket.emit('publicKey', base64url.encode(JSON.stringify(message)))
  }

  end = () => {
    if (this.session && this.session.connected) {
      this.session.disconnect()
    } else {
      this.onSessionEnded && this.onSessionEnded('session already disconnected')
    }
  }

  send = async msg => {
    await this.cryptographer.generateKeyPair()
    await this.create()
    // encrypt message with session key
    const box = await this.cryptographer.encrypt(msg)
    // and send it to the Rendezvous service
    this.session.emit('message', box)
  }
}

export { RendezvousClientSession }
