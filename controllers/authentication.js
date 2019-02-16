const User = require('../models/user');
const jwt = require('jwt-simple');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signup = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide and username and password' });
  }

  // See if a user with the given username exists
  User.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with username does exist, return an error
    if (existingUser) {
      console.log('existing user');
      return res.status(422).json({ error: 'Username is in use' });
    }

    //If a user with username does NOT exist, create and save user record
    const user = new User({
      username,
      password,
    });

    // Respond to request indicatin the user was created
    user
      .save()
      .then(user =>
        res.json({ token: tokenForUser(user), username: req.user.username })
      )
      .catch(err => next(err));
  });
};

exports.signin = (req, res, next) => {
  //User has already had their username and password auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user), user: req.user });
};

exports.getall = (req, res, next) => {
  console.log('hi');
  User.find().then(items => res.json(items));
};
