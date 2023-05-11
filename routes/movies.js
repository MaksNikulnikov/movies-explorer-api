const router = require('express').Router();
const { validateMovieDeletion, validateMovieCreation } = require('../validation');
const { getMovies, deleteMovie, createMovie } = require('../controllers/movies');

router.delete('/:movieId', validateMovieDeletion, deleteMovie);
router.get('/', getMovies);
router.post('/', validateMovieCreation, createMovie);

module.exports = router;
