// Override the defaults
const config = require('./config.global');

config.env = 'dev';

// db config
config.db = {
  hostname : 'localhost',
  port: 3306,
  database : 'zenoe',
  user : 'root',
  password : '123456',
}

config.secret = "this is secret for dev use"
module.exports = config;
