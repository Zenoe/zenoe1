
const {connectDB} = require('database')
const {DBManager} = require('database/mysql');
const {LogManager} = require('services/logger')
const { dbConfig } = require('config')
const {appConfig} = require('config')

connectDB();
const dbManager = new DBManager(dbConfig)
const logManager = new LogManager(appConfig)
const logger = logManager.getLogger()

// todo mv to test
// dbManager.query('select 1 * 1').then((res)=>{
//   console.log(res);
// }).catch(err=>{
//   console.log('err', err);
// })


module.exports = {
  logger
}
