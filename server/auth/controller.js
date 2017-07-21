const User = require('user/model');
const { signToken } = require('./auth');

exports.signin = (req, res, next) => {
  const token = signToken(req.user._id);
  res.json({ token });
};
