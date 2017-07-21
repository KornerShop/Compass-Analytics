const User = require('./model');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .select('-password')
    .exec()
    .then(user => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, err => {
      next(err);
    });
};

exports.get = (req, res, next) => {
  User.find({})
    .select('-password')
    .exec()
    .then(users => {
      res.json(users.map(user => user.toJson()));
    }, err => {
      next(err);
    });
};
