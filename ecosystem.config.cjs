module.exports = {
  apps: [{
    name: 'identity-service',
    script: './node_modules/.bin/identity-service',
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
