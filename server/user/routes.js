const router = require('express').Router();
const  = require('./controller');
const auth = require('../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/users/login')
  .post(controller.post);

module.exports = router;
