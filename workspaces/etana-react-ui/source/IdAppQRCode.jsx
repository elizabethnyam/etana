import { QRCodeCanvas } from 'qrcode.react'

const IdAppQRCode = ({ connectUrl, title = 'IdApp QR Code' }) => (
  <a href={connectUrl} title={title}>
    <QRCodeCanvas value={connectUrl} />
  </a>
)

export { IdAppQRCode }
