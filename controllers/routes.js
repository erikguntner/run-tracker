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
  const { _id } = req.user;

  const newRoute = {
    elevationData,
    startPoint,
    endPoint,
    viewport,
    pointFeatures,
    lineFeatures,
    distance,
  };

  User.findOneAndUpdate({ _id: _id }, { $push: { routes: newRoute } }, function(
    err,
    doc
  ) {
    if (err) return res.status(400).error(err);
    console.log(doc);
  });
};

exports.getAllRoutes = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id, (err, user) => {
    if (err) return res.status(400).error(err);

    res.status(200).json(user.routes);
  });
};
