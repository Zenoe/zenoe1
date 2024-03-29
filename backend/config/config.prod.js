// Override the defaults
const config = require('./config.global')
const mongoDBHost = '10.110.198.52'
// db config
config.db = {
  // mongo
  MONGO_URI: `mongodb://${mongoDBHost}:27017/rnms`,

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
  hostname: mongoDBHost,
  JWT_SECRET: '123asdjkl',
  cors: ['http://10.110.198.52'],
  JWT_EXPIRE: 3600,
  loggerLevel: 'info'
}

module.exports = config
