const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const commonPaths = require('./common-paths')

const devServer = require('./devServer')

const webpack = require('webpack')

const globalVar = {
  SERVER_URL: 'http://10.110.198.52:7007'
}

const config = {
  mode: 'development',
  entry: {
    app: `${commonPaths.appEntry}/index.js`
  },
  output: {
    filename: 'h5/[name].[contenthash].js'
  },
  // add for [HMR] Update failed: ChunkLoadError: Loading hot update chunk app failed
  // https://stackoverflow.com/questions/65640449/how-to-solve-chunkloaderror-loading-hot-update-chunk-second-app-failed-in-webpa
  // someone reported that when finish hot reload the component state is 'reloaded' and state is cleared
  // to solve must use devServer: {devMiddleware: {writeToDisk : true}}
  optimization: {
    runtimeChunk: 'single'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localsConvention: "camelCase",
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins:
  // [new webpack.HotModuleReplacementPlugin()],
  [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(globalVar.API_URL),
      LOGIN_URL: JSON.stringify(globalVar.LOGIN_URL),
      SERVER_URL: JSON.stringify(globalVar.SERVER_URL),
      PRO_MODE: false,
      MOCK_MODE: false
    }),
    new ReactRefreshWebpackPlugin()
  ],

  devServer
}

module.exports = config
