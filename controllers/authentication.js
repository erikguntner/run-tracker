const User = require("../models/user");
const jwt = require("jwt-simple");

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide and email and password" });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    //If a user with email does NOT exist, create and save user record
    const user = new User({
      email,
      password
    });

    // Respond to request indicatin the user was created
    user
      .save()
      .then(user => res.json({ token: tokenForUser(user) }))
      .catch(err => next(err));
  });
};

exports.signin = (req, res, next) => {
  //User has already had their email and password auth'd
  // we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.getall = (req, res, next) => {
  console.log("hi");
  User.find().then(items => res.json(items));
};
