const express = require('express')
const rfs = require('rotating-file-stream')
const morgan = require('morgan')
const path = require('path')
const {appConfig} = require('./config')
// require('./database')

const {logger} = require('./init')
// const people = require('./routes/people')
const auth = require('./routes/auth')
const userRoutes = require( "./routes/userRoutes");

const cors = require('cors');
const errorHandler = require('middleware/errorHandler');
const { log } = require('util')

const app = express()

logger.info('start app server');
// logger.crit('xx')

const accessLogStream = rfs.createStream(`${appConfig.logdir}/access.log`, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

// app.use(cors());
app.use(cors({
  credentials: true,
  // credentials is confilct with "*" origin, so we need specify origins
  origin: ['http://172.28.57.108:3009', ]
}));
// app.use('/api/people', people)
// app.use('/login', auth)
// app.use('/database', dbConn)

// loging
app.use("/api/users", userRoutes);

app.use('/users', require('./users/users.controller'));
app.use('/wordcount', require('./components/wc/wc-controller'));

app.use(errorHandler);

process.on('unhandledRejection', error => {
 throw error
})

process.on('uncaughtException', error => {
  logger.crit(`uncaughtException: ${error}\n ${error.stack}`)
  process.exit(1)
})
const port = process.env.NODE_ENV === 'pro' ? (process.env.PORT || 80) : appConfig.port;
app.listen(port, () => console.log('Server listening on port ' + port));

