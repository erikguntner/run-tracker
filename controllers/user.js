const User = require('../models/user');

exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id, (err, user) => {
    if (err) return res.error(err);

    res.send({ user: user });
  });
};

exports.getUserData = (req, res, next) => {
  res.status(200).json({ username: req.user.username });
};
