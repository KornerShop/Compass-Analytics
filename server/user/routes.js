const router = require('express').Router();
const { login, verify } = require('./controller');

router.route('/users/login')
  .post(login);

router.route('/users/verify')
  .post(verify);

module.exports = router;
