
module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode === 400) {
    return res.status(statusCode).send({ message: 'Error bad request, a validation error has occured' });
  } else if (statusCode === 401) {
    return res.status(statusCode).send({ message: err.message });
  } else if (statusCode === 404) {
    return res.status(statusCode).send({ message: 'Error not found' });
  }
  else if (statusCode === 500) {
    res.status(statusCode).send({
      message: statusCode === 500 ? 'An error occured on the server' : message
    });
  }
}