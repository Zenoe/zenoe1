const commonPaths = require('./common-paths');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const globalVar = {
  SERVER_URL:'https://wis.ruijie.com.cn',
}
const config = {
  mode: 'production',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`],
  },
  output: {
    filename: 'h5/[name].[fullehash].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              // localsConvention: 'camelCase',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[fullehash].css',
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(globalVar.API_URL),
      LOGIN_URL: JSON.stringify(globalVar.LOGIN_URL),
      SERVER_URL: JSON.stringify(globalVar.SERVER_URL),
      PRO_MODE:true,
      MOCK_MODE:false,
    })
  ],
};

module.exports = config;
