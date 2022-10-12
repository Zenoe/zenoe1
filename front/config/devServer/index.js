const port = process.env.PORT || 3009

module.exports = {
  host: '0.0.0.0',
  port,
  historyApiFallback: true,
  hot: true
  // disableHostCheck: true,
  // open: true,
}
