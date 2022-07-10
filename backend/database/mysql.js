const util = require('util')
const mysql = require('mysql2')
const logger = require('services/logger')

const { dbConfig } = require('config')

// const util = require('util')
let db = {}

class DBManager{
  constructor(dbConfig){
    this.pool = mysql.createPool({
      host: dbConfig.hostname,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.dbName,
    });
  }

  query (in_sql){
    // this.pool.query('select 1 + 1', (err, rows) => { console.log('connected') });
    // unbound method
    const queryPromise = util.promisify(this.pool.query.bind(this.pool))
    return queryPromise(in_sql);
  }
}


mysqlconn = (in_config) => {
  return new Promise((resolve, reject)=>{
    db = mysql.createConnection({
      host: in_config.hostname,
      user: in_config.user,
      password: in_config.password,
      database: in_config.dbName,
    })

    db.connect( (err) => {
      if(err){
        reject(err)
      }else{
        resolve('Mysql connected...')
      }
    })
  })
}

// const callFunction=async()=>{
//   try{
//     const result = await dbConn.connect(cfg.db)
//   }catch(err){
//     console.log(err)
//   }
// }
// callFunction ()

// mysqlconn(dbConfig).then(res => {
//   console.log('connect ok', res);
// }).catch(err => {
//   console.log('catchcat', err);
// })

module.exports = {
  DBManager,
}
