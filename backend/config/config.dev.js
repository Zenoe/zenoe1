// Override the defaults
const config = require('./config.global');

// db config
config.db = {
  MONGO_URI: 'mongodb://172.28.57.108:27017/note',
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
  hostname : '172.28.57.108',
  JWT_SECRET: '123asdjkl',
}

module.exports = config;
