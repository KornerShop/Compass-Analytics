const router = require('express').Router();
const { verifyUser } = require('./auth');
const { signIn } = require('./controller');

router.post('/auth/login', verifyUser(), signIn);

module.exports = router;
