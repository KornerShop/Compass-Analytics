/* eslint-disable no-console */

const { genToken, decodeToken } = require('../utils/jwt.js');
const User = require('./model');

exports.login = (req, res) => {
  console.log('\nlogin\n')
  const { username } = req.body;
  const { password } = req.body;

  if (!username || !password) {
    res.status(400).send('Please enter both a username & password');
    res.end();
  }

  User.findOne({ username }).exec((err, user) => {
    if (err) {
      console.error(err);
    }
    if (!user) {
      res.status(401).json('No user with the given username');
      res.end();
    } else if (!user.authenticate(password)) {
      res.status(401).json('Incorrect password');
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
  console.log('\nverify\n');
  const { authorization: rawToken } = req.headers;
  console.log('rawToken:', JSON.stringify(rawToken, null, 2));
  const token = rawToken.replace('Bearer ', '');
  console.log('token:', JSON.stringify(token, null, 2));
  decodeToken(token, (err, user) => {
    if (err) {
      res.status(401).send('Invalid token');
      res.end();
    }
    console.log(`user: ${JSON.stringify(user, null, 2)}`);
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
        console.log('newToken:', JSON.stringify(newToken, null, 2));
        res.status(200).json({
          token: newToken,
        });
      },
    );
  });
};
