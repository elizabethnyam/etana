module.exports = {
  apps: [{
    name: 'nameservice',
    script: './node_modules/.bin/nameservice',
    args: 'start',
    instances: 1,
    autorestart: false,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
