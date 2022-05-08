const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils')

/* 通过require获取js文件中导出的函数，执行并传递app参数 */
const mockServer = (mockFolder, app) => {
  utils.findSync(mockFolder, ['data']).forEach(dir => require(dir)(app));
  console.log('Mock: service started successfully');
}

module.exports = {
  mockServer
};

module.exports = {
  devServer: {
    // sockHost: 'h5'
    // 配置mock环境
    before: app => {
      mockServer(path.resolve(__dirname, '../mock'), app)
    },

    // 配置联调环
    proxy: {}
  },
  plugins:
  [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('/h5/api'),
      MOCK_MODE: true,
    })
  ],
};
