const env = process.env.NODE_ENV || 'dev'
const cfg = require('./config.'+env + '.js');

const dbConfig = cfg.db
const authConfig = cfg.auth
const appConfig = cfg.appcfg
module.exports ={
  appConfig,
  dbConfig,
  authConfig
}
