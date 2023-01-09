const express = require('express')
const fileUpload = require('express-fileupload')
const rfs = require('rotating-file-stream')
const morgan = require('morgan')
const path = require('path')
const { appConfig } = require('./config')
// require('./database')
require('dotenv').config()
const { initDB, logger } = require('./init')
// const people = require('./routes/people')

const cors = require('cors')
const { errorHandler, asyncErrorHandler } = require('middleware/errorHandler')
const checkReqMethod = require('middleware/checkReqMethod')

const app = express()
app.use(checkReqMethod)

const cookieParser = require('cookie-parser')
app.use(cookieParser())
logger.info('start app server')
// need cookieParser middleware before we can do anything with cookies

const accessLogStream = rfs.createStream(`${appConfig.logdir}/access.log`, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 6 * 1024 * 1024 * 1024 // 4MB max file(s) size
  }
}))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
// static assets
app.use('/static', express.static(path.join(__dirname, './static')))
app.use('/upload', express.static(path.join(__dirname, './upload')))

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
// app.use(express.json())
app.use(express.json({ limit: '200mb' }))
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }))

// app.use(cors());
app.use(cors({
  credentials: true,
  // credentials is confilct with "*" origin, so we need specify origins
  origin: appConfig.cors
}))

require('./startup/routes')(app)

app.use(errorHandler)

process.on('unhandledRejection', error => {
  throw error
})

process.on('uncaughtException', error => {
  asyncErrorHandler(error)
})

const port = process.env.NODE_ENV === 'pro'
  ? (process.env.PORT || 80)
  : appConfig.port

// (add an extra ;) unexpected newline between function and ( of function call
;(async () => {
  await initDB()
  app.listen(port, (/* err */) => console.log(`Server listening on ${port} `))
})()
