// Override the defaults
const config = require('./config.global');
const mongoDBHost='10.110.198.50'
// db config
config.db = {
  MONGO_URI: `mongodb://${mongoDBHost}:27017/note`,
  host : 'localhost',
  port: 3306,
  database : 'zenoe',
  user : 'root',
  password : '123456',
}

config.appcfg = {
  port : 7007,
  logdir : '/var/log/zenoe',
  env : 'dev',
  hostname : mongoDBHost,
  JWT_SECRET: '123asdjkl',
}

module.exports = config;
