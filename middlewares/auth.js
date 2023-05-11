const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { MESSAGE_UNAUTORIZED, DEV_KEY, MODE_PRODUCTION } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(MESSAGE_UNAUTORIZED));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY);
  } catch (err) {
    next(new UnauthorizedError(MESSAGE_UNAUTORIZED));
    return;
  }

  req.user = payload;

  next();
};
