const { mongoose } = require('mongoose')
const connectMongo = async (_dbconfig) => {
  try {
    const conn = await mongoose.connect(_dbconfig.MONGO_URI, {
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
    console.log(`MongoDB Connected failed`)
    throw err
  }
}

// export default connectMongo;
module.exports = {
  connectMongo
}
