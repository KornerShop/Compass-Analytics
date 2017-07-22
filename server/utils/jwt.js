const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const {
  expiresIn,
  secrets: { jwt: secret },
} = require('../config/config');

exports.genToken = ({ _id, username }) =>
  jwt.sign({ _id, username }, secret, {
    expiresIn,
  });

exports.checkToken = expressJwt({ secret });
