// Connection file to mongo db
const { dbConfig } = require('config')
const { mongoose } = require('mongoose')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbConfig.MONGO_URI, {
      // without auth section, connection return 'Authentication failed'
      auth: {
        username: 'admin',
        password: 'password'
      },
      authSource: 'admin'
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    })
    // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    // throw or not throw, expcetion will always be caught by asyncErrorHandler
    // might add more info to err and then throw
    throw err
  }
}

// export default connectDB;
module.exports = {
  connectDB
}
