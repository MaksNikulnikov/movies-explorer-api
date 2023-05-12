const http2 = require('http2');
const { MESSAGE_INTERNAL_SERVER_ERROR } = require('../constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? MESSAGE_INTERNAL_SERVER_ERROR
        : message,
    });
  next();
});
