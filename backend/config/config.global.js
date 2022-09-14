// another way to exports
// const config = module.exports = {};

const config = {
  auth:{
    secret:'thisismysecret',
  },
  db:{
    type:'mysql',
  },
  appcfg:{
    port : 5000,
    logdir : '/var/log/zenoe',
    env : 'dev',
    hostname : '10.110.198.50',
  }
}

// export just one thing
module.exports = config;
