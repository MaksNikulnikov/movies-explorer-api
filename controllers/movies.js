const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  MESSAGE_FORBIDDEN_MOVIE_DELETION,
  MESSAGE_FILM_DOESNOT_EXIST,
  MESSAGE_FILM_ID_INCORRECT,
  MESSAGE_FILM_DATA_INCORRECT,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((searchedMovie) => {
      if (!(String(req.user._id) === searchedMovie.owner.toString())) {
        return Promise.reject(new ForbiddenError(MESSAGE_FORBIDDEN_MOVIE_DELETION));
      }
      return searchedMovie.deleteOne().then(() => { res.send(searchedMovie); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(MESSAGE_FILM_DOESNOT_EXIST));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(MESSAGE_FILM_ID_INCORRECT));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(MESSAGE_FILM_DATA_INCORRECT));
      } else {
        next(err);
      }
    });
};
