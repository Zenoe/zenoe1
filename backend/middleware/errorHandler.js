module.exports = errorHandler;

const {logger} = require('init')
function errorHandler(err, req, res, next) {
    logger.error(err)

    switch (true) {
    case typeof err === 'string':
        // custom application error
        const is404 = err.toLowerCase().endsWith('not found');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    case err.name === 'UnauthorizedError':
        // jwt authentication error
        return res.status(401).json({ message: 'Unauthorized' });
    case err.name === 'ApplicationError':{
        return res.status(404).json({ message: err.message });
    }
    default:
        return res.status(500).json({ message: err.message });
    }
}
