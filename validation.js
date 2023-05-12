const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('./constants');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).required().max(30),
    password: Joi.string().required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateMovieDeletion = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});

const validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEXP),
    trailerLink: Joi.string().required().pattern(URL_REGEXP),
    thumbnail: Joi.string().required().pattern(URL_REGEXP),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateUserDataChanging = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateMovieDeletion,
  validateMovieCreation,
  validateUserDataChanging,
};
