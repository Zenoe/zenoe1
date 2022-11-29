
const { connectMongo } = require('database/mongo')
const { LogManager } = require('services/logger')
const { dbConfig } = require('config')
const { appConfig } = require('config')

connectMongo(dbConfig)
const logger = new LogManager(appConfig).getLogger()

// const { connectMysql } = require('database/mysql')
// const mysqlIns = new connectMysql(dbConfig)
// todo mv to test
// mysqlIns.query('select 1 * 1').then((res)=>{
//   console.log(res);
// }).catch(err=>{
//   console.log('err', err);
// })

module.exports = {
  logger
}
