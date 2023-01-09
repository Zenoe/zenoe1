// Override the defaults
const config = require('./config.global')

// db config
config.db = {
  // mongo
  MONGO_URI: 'mongodb://10.110.198.50:27017/rnms',

  // mysql
  host: 'localhost',
  port: 3306,
  database: 'zenoe',
  user: 'root',
  password: '123456'
}

config.appcfg = {
  port: 7007,
  logdir: '/var/log/zenoe',
  env: 'dev',
  hostname: '10.110.198.50',
  JWT_SECRET: '123asdjkl',
  // JWT_EXPIRE: '1h',
  // JWT_EXPIRE: '10', // 10ms, string withou unit default as millisecond
  JWT_EXPIRE: 10, // 10s
  cors: ['http://10.110.198.50:3009'],
  loggerLevel: 'debug'
}

module.exports = config
