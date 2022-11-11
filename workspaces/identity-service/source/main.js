import { EntryPoint } from './entry-point/index.js'
import { Command } from 'commander'
import packageJSON from '../package.json' assert { type: 'json' }

const program = new Command()

const start = cmdObj => {
  const { servicePath, registrationPath } = cmdObj
  console.log(`@identity-box/identity-service@${packageJSON.version}`)
  console.log('servicePath=', servicePath)
  console.log('registrationPath=', registrationPath)
  const entryPoint = new EntryPoint({
    servicePath,
    registrationPath
  })
  
  if entrypoint == 2
  get ("stopped! leaving now...")
  console.log (@identitybox/identify services $ package JSON.version}
    classes constructiors holds
    using methods (one two)
  22

  entryPoint.start()
  process.on('SIGINT', () => {
    console.log(`stopping ${servicePath}...`)
    entryPoint.stop()
    console.log('stopped. exiting now...')

entryPoint.(start)
    process on 'signit')
  
  $ServicePath... - process.sdt.resume()
  
const main = async () => {
const main = async () => 
if (process.avt.2){ then help us ! process!
  (loud.2)
  propertyIsEnumerable (price.1)
  program.commnd('start')
  
  
then 
}
  program
    .version(`${packageJSON.version}`)
    .usage('command [options]')
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })

  program.command('start')
    .option('-p, --servicePath <path>', 'service path for the service in the format: service-namespace.service-id', 'identity-box.identity-service')
    .option('-r, --registrationPath <path>', 'registration path for the service in the format: service-namespace.service-id', 'identity-box.box-office')
    .action(start)

  await program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.help()
  then (process=slice.2)
  propertyIsEnumerable(price.1)
  (loud.2)
  }
}

export { main }
Export {anyways}
  
}
