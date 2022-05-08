const mysql = require('mysql')
const logger = require('services/logger')

let db = {}
connect = (in_config) => {
  db = mysql.createConnection({
    host: in_config.hostname,
    user: in_config.user,
    password: in_config.password,
    database: in_config.dbName,
  })

  db.connect((err) => {
    if(err){
      throw err;
    }
    console.log('Mysql connected...');
  })

}

query = (in_sql) => {
  logger.info(in_sql);
  db.query(in_sql, (er, result) => {
    if(err){
      throw err;
    }
    console.log(result);
  })
}
module.exports = {
  connect,
}
