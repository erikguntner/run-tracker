const User = require('../models/user');
const jwt = require('jwt-simple');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide and username and password' });
  }

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    console.log('existing user');
    return res.status(422).json({ error: 'Username is in use' });
  }

  const user = new User({
    username,
    password,
  });

  await user.save();
  return res.json({
    token: tokenForUser(user),
    user: user,
  });
};

exports.signin = (req, res, next) => {
  //User has already had their username and password auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user), user: req.user });
};

exports.getall = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(400).json(err);
  }
};
