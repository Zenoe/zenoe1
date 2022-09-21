const {appConfig} = require("config");

const pino = require('pino');
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

class LogManager{
  constructor(in_config) {
      this.logger = pino({
        // todo set transport according to env
        transport: {
          targets: [
            { target: 'pino/file', level: 'info' ,
              options: {destination: `${in_config.logdir}/common.log`}
            },
            { target: 'pino-pretty',
              level: appConfig.loggerLevel,
              options:{
                colorize: true,
                levelFirst: true,
                // translateTime: 'SYS:yyyy-mm-dd h:MM:ss TT Z o',
                translateTime: 'SYS:yyyy-mm-dd h:MM:ss TT',
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

  getLogger(){
    return this.logger
  }
}

module.exports = {
  LogManager,
}
