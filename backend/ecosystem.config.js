module.exports = {
  apps: [{
    name: 'zenoe',
    script: './app.js',
    instances: 1,
    autorestart: true,
    watch: true, // [index.js...]
    env_production: {
      NODE_PATH: '.',
      NODE_ENV: 'pro'
    },
    env_development: {
      NODE_PATH: '.',
      NODE_ENV: 'dev'
    },
    node_args: '--trace-warnings'
  }]
}
