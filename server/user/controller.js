/* eslint-disable no-console */

const { genToken, decodeToken } = require('../utils/jwt.js');
const User = require('./model');

exports.login = (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  User.findOne({ username }).exec((err, user) => {
    if (err) {
      console.error(err);
    }
    if (!user) {
      res.status(401).send('No user with the given username');
      res.end();
    } else if (!user.authenticate(password)) {
      res.status(401).send('Incorrect password');
      res.end();
    } else {
      const token = genToken(user);
      res.status(200).json({
        token,
      });
      res.end();
    }
  });
};

exports.verify = (req, res) => {
  const { authorization: rawToken } = req.headers;
  const token = rawToken.replace('Bearer ', '');
  decodeToken(token, (err, user) => {
    if (err) {
      res.status(401).send('Invalid token');
      res.end();
    }
    User.findById(
      {
        _id: user._id,
      },
      (err, user) => {
        if (err) {
          res.status(401).send('User not found');
          res.end();
        }
        const newToken = genToken(user);
        res.status(200).json({
          token: newToken,
        });
      },
    );
  });
};
