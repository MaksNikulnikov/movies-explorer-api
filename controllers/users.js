const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  MESSAGE_USER_NOT_FOUND,
  MESSAGE_USER_DATA_INCORRECT,
  MESSAGE_EMAIL_MUST_BE_UNIQUE,
  MESSAGE_USER_DATA_INCORRECT_CREATION,
  MESSAGE_USER_DATA_INCORRECT_CHANGING,
  MESSAGE_WRONG_DATA_LOGIN,
  DEV_KEY, MODE_PRODUCTION,
} = require('../constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MESSAGE_USER_NOT_FOUND));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new NotFoundError(MESSAGE_USER_DATA_INCORRECT));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(MESSAGE_EMAIL_MUST_BE_UNIQUE));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(MESSAGE_USER_DATA_INCORRECT_CREATION));
      } else {
        next(err);
      }
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(MESSAGE_USER_DATA_INCORRECT_CHANGING));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE_EMAIL_MUST_BE_UNIQUE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(MESSAGE_WRONG_DATA_LOGIN));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(MESSAGE_WRONG_DATA_LOGIN));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === MODE_PRODUCTION ? JWT_SECRET : DEV_KEY,
            { expiresIn: '7d' },
          );
          res.send({ token });
          return null;
        });
    })
    .catch(next);
};
