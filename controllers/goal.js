const User = require('../models/user');

exports.setGoal = async (req, res, next) => {
  const { _id } = req.user;
  const { goal } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: _id },
    { goal: goal },
    { new: true }
  ).exec();

  return res.status(200).json({ goal: updatedUser.goal });
};
