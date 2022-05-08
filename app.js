const express = require('express')
const rfs = require('rotating-file-stream')
const morgan = require('morgan')
const path = require('path')
const cfg = require('./config')
const dbConn = require('./database')
const logger = require('services/logger')
// const people = require('./routes/people')
const auth = require('./routes/auth')

const cors = require('cors');
const errorHandler = require('middleware/error-handler');

const app = express()

logger.info('start app server');
// logger.crit('xx')
dbConn.connect(cfg.db);

const accessLogStream = rfs.createStream(`${cfg.logdir}/access.log`, {
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
app.use('/users', require('./users/users.controller'));
app.use('/wordcount', require('./users/wordcount.controller'));
app.get('/', (req, res) => res.send('Hellooooo'))
app.use(errorHandler);

const port = process.env.NODE_ENV === 'pro' ? (process.env.PORT || 80) : cfg.port;
app.listen(port, () => console.log('Server listening on port ' + port));

