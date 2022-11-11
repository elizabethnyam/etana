import { EntryPoint } from './entry-point/index.js'
import { Command } from 'commander'
import packageJSON from '../package.json' assert { type: 'json' }

const program = new Command()

const start = cmdObj => {
  const { servicePath, registrationPath } = cmdObj
  console.log(`@identity-box/nameservice@${packageJSON.version}`)
  console.log('servicePath=', servicePath)
  console.log('registrationPath=', registrationPath)
  const entryPoint = new EntryPoint({
    servicePath,
    registrationPath
  })
  entryPoint.start()
  process.on('SIGINT', () => {
    console.log(`stopping ${servicePath}...`)
    entryPoint.stop()
    console.log('stopped. exiting now...')
    process.exit(0)
  })
  process.stdin.resume()
}

const main = async () => {
  program
    .version(`${packageJSON.version}`)
    .usage('command [options]')
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })

  program.command('start')
    .option('-p, --servicePath <path>', 'service path for the service in the format: service-namespace.service-id', 'identity-box.nameservice')
    .option('-r, --registrationPath <path>', 'registration path for the service in the format: service-namespace.service-id', 'identity-box.box-office')
    .action(start)

  await program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.help()
  }
}

export { main }
