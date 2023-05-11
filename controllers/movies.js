const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).orFail()
    .then((searchedMovie) => {
      if (!(String(req.user._id) === searchedMovie.owner.toString())) {
        return Promise.reject(new ForbiddenError('Вы не можете удалить этот фильм'));
      }
      return searchedMovie.deleteOne().then(() => { res.send(searchedMovie); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id фильма.'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id фильма.'));
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
        next(new BadRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};
