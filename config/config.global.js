// another way to exports
// const config = module.exports = {};

const config = {}
config.port = 5000
config.logdir = '/var/log/zenoe'
config.env = 'dev';
config.hostname = '172.28.57.108';

// mysql database
config.db = {}
config.db.mysql = {}
config.db.mysql.dbName = ''


//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'example_dev';

// export just one thing
module.exports = config;
