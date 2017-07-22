const { genToken } = require('../utils/jwt.js');
const User = require('./model');

exports.post = (req, res) => {
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
      res.status(401).send('No user with the given username');
      res.end();
    } else if (!user.authenticate(password)) {
        res.status(401).send('Incorrect password');
        res.end();
      } else {
        const token = genToken(user);
        res.json({
          token,
        });
      }
  });
};
