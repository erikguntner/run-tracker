const Route = require('../models/route');
const User = require('../models/user');

exports.addRoute = (req, res, next) => {
  const {
    elevationData,
    startPoint,
    endPoint,
    viewport,
    pointFeatures,
    lineFeatures,
    distance,
  } = req.body;
  const { id } = req.params;

  const newRoute = {
    elevationData,
    startPoint,
    endPoint,
    viewport,
    pointFeatures,
    lineFeatures,
    distance,
  };

  User.findById(id, (err, user) => {
    if (err) return res.error(err);

    user.routes.push(newRoute);

    user
      .save()
      .then(user => res.status(200).json(user))
      .catch(err => res.json({ msg: err }));
  });

  // res.send({ msg: 'I just created a route' });
};

exports.getAllRoutes = (req, res, next) => {
  res.send({ msg: 'This is all the routes' });
};
