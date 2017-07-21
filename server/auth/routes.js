const router = require('express').Router();
const { verifyUser } = require('./auth');
const { signIn } = require('./controller');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/login', verifyUser(), signIn);

module.exports = router;
