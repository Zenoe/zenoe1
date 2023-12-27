module.exports = errorHandler

const { logger } = require('init')
/*
  app.use((err: any, req: Request, res: Response, next: NextFunction) => res.status(300).json(err.message));
  Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.
  Express must be looking at the length property of the function in order to know whether it's an error-handling middleware or not.
*/
// need to add next parameter
// or visit http://10.110.198.50:7007/ from browser cause: typeerror res.status is not a function express
function errorHandler (err, req, res, next) {
  logger.error(`errorHandler: ${err.stack || err}`)
  switch (true) {
    case typeof err === 'string':
    {
      const is404 = err.toLowerCase().endsWith('not found')
      const statusCode = is404 ? 404 : 400
      return res.status(statusCode).json({ message: err })
    }
    case err.name === 'trivial':
      return res.status(200).json({})
    // custom application error
    case err.name === 'UnauthorizedError':
    // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' })
    case err.name === 'ApplicationError':
      return res.status(404).json({ message: err.message })
    default:
      return res.status(500).json({ message: err.message })
  }
}

function asyncErrorHandler (err) {
  logger.error(`asyncErrorHandler: ${err.message}, ${err.stack}`)
  if (err.res) { err.res.status(500).json({ message: err.message }) }
  // process.exit(1)
}

module.exports = {
  errorHandler,
  asyncErrorHandler
}
