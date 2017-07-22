const jwt = require('jsonwebtoken');

const {
  expiresIn,
  secrets: { jwt: secret },
} = require('../config/config');

exports.genToken = ({ _id, username }) => {
  console.log(`_id: ${_id}`);
  console.log(`username: ${username}`);
  return jwt.sign({ _id, username }, secret, {
    expiresIn,
  });
};

exports.decodeToken = (token, cb) => {
  jwt.verify(token, secret, cb);
};
