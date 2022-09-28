const { merge } = require('webpack-merge');
const buildValidations = require('./config/build-validations');
const commonConfig = require('./config/webpack.common');

module.exports = (env) => {
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  let mockConfig={}
  if(env.mock){
    mockConfig = require(`./config/webpack.mock.js`);
  }

  const envConfig = require(`./config/webpack.${env.env}.js`);
  const mergedConfig = merge(
    commonConfig(env),
    mockConfig,
    envConfig,
  );

  return mergedConfig;
};
