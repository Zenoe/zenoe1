const path = require('path');

const env = process.env.NODE_ENV || 'dev'
const cfg = require('./config.'+env + '.js');

const dbConfig = cfg.db
const authConfig = cfg.auth
const appConfig = cfg.appcfg

const settings = {
  PROJECT_DIR : path.join(__dirname, "../"),
  POST_MAX_SIZE : 40 , //MB
  UPLOAD_MAX_FILE_SIZE: 40, //MB
}
module.exports ={
  appConfig,
  dbConfig,
  authConfig,
  ...settings
}
