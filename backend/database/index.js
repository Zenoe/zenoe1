//Connection file to mongo db
const { dbConfig } = require('config')
const {mongoose} = require('mongoose');
const {colors} = require('colors')
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbConfig.MONGO_URI, {
      // without auth section, connection return 'Authentication failed'
      "auth": {
        "username": "admin",
        "password": "admin",
      },
      authSource:"admin",
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

// export default connectDB;
module.exports = {
  connectDB
}
