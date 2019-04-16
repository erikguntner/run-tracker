const User = require('../models/user');

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.status(200).json({ user: user });
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.getUserData = (req, res, next) => {
  res
    .status(200)
    .json({
      username: req.user.username,
      runlog: req.user.runlog,
      goal: req.user.goal,
    });
};
