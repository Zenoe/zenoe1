
const pino = require('pino');
const obj = {};
const cfg = require('config')

const streams = [
  { stream: process.stdout },
  { stream: pino.destination(`${__dirname}/logger.log`) },
];

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

if( !obj.log ){
  obj.log = pino({
    transport: {
      targets: [
        { target: 'pino/file', level: 'info' ,
          options: {destination: `${cfg.logdir}/common.log`}
        },
        { target: 'pino-pretty',
          level: 'info',
          options:{
            colorize: true,
            levelFirst: true,
            translateTime: 'yyyy-dd-mm, h:MM:ss TT',
          }
        }
      ]
    },
    level: process.env.NODE_ENV === 'pro' ? 'info' : 'debug',
    customLevels: levels,
    useOnlyCustomLevels: true,
  })

  // obj.log = pino(transport)
  // pino.destination(`${__dirname}/combined.log`)
  // pino.multistream(streams)

}
module.exports = obj.log;
