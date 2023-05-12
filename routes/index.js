const router = require('express').Router();

const { validateSignup, validateSignin } = require('../validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { MESSAGE_NOT_FOUND } = require('../constants');

router.post('/signin', validateSignin, require('../controllers/users').login);
router.post('/signup', validateSignup, require('../controllers/users').createUser);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => next(new NotFoundError(MESSAGE_NOT_FOUND)));

module.exports = router;
