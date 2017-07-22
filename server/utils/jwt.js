/* eslint-disable no-console */

const jwt = require('jsonwebtoken');

const {
  expiresIn,
  secrets: { jwt: secret },
} = require('../config/config');

exports.genToken = ({ _id, username }) =>
  jwt.sign({ _id, username }, secret, {
    expiresIn,
  });

exports.decodeToken = (token, cb) => {
  jwt.verify(token, secret, cb);
};
