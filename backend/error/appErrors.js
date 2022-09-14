class ApplicationError extends Error {
  constructor(message, details = {}) {
    super();
    this.name = 'ApplicationError';
    this.message = message || 'An application error occured';
    this.details = details;
  }
}

class AsyncError extends Error {
  constructor(res, message, details = {}) {
    super();
    this.name = 'AsyncError';
    this.res = res;
    this.message = message;
    this.details = details;
  }
}

class UnauthorizedError extends ApplicationError {
  constructor(message, details) {
    super(message, details);
    this.name = 'UnauthorizedError';
    this.message = message || 'Unauthorized';
  }
}

module.exports = {
  ApplicationError,
  UnauthorizedError,
  AsyncError,
};
// catch (err) {
//   if (err instanceof Errors.BadRequest)
//     return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
//   if (err instanceof Errors.Forbidden)
//     return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
//   if (err instanceof Errors.NotFound)
//     return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
//   if (err instanceof Errors.UnprocessableEntity)
//     return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
//   console.log(err);
//   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
// }
