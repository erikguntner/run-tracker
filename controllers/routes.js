const User = require('../models/user');

exports.addRoute = async (req, res, next) => {
  const {
    image,
    title,
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
    title,
    image,
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
    { $push: { routes: newRoute } },
    { new: true }
  );

  console.log(updatedUser.routes[updatedUser.routes.length - 1]);

  res.status(200).send(updatedUser.routes[updatedUser.routes.length - 1]);
};

exports.getAllRoutes = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  return res.status(200).json(user.routes);
};

exports.deleteRoute = async (req, res, next) => {
  const { id } = req.query;

  const removedRoute = await User.updateOne(
    { _id: req.user._id },
    { $pull: { routes: { _id: id } } }
  );

  res.status(200).json({ route: removedRoute });
};
