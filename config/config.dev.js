// Override the defaults
const config = require('./config.global');

// db config
config.db = {
  host : 'localhost',
  port: 3306,
  database : 'zenoe',
  user : 'root',
  password : '123456',
}

config.appcfg = {
  port : 5000,
  logdir : '/var/log/zenoe',
  env : 'dev',
  hostname : '172.28.57.108',
}
module.exports = config;
