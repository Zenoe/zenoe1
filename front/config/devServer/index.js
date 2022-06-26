const port = process.env.PORT || 3009;

module.exports = {
  host: '0.0.0.0',
  port: port,
  historyApiFallback: true,
  hot: true,
  // sockHost: 'http://172.18.233.52:8080/',
  // disableHostCheck: true,
  // open: true,
}
