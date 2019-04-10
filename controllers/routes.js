const User = require('../models/user');

exports.addRoute = async (req, res, next) => {
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

  const updatedUser = await User.findOneAndUpdate(
    { _id: _id },
    { $push: { routes: newRoute } }
  );

  res.status(200).send(updatedUser);
};

exports.getAllRoutes = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  return res.status(200).json(user.routes);
};
