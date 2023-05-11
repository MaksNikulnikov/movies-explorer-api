const router = require('express').Router();
const { validateUserDataChanging } = require('../validation');
const { getUser, patchUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validateUserDataChanging, patchUser);

module.exports = router;
