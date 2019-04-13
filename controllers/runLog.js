const User = require('../models/user');

exports.postRun = async (req, res, next) => {
  const { _id } = req.user;

  const updatedRunLog = await User.findOneAndUpdate(
    { _id: _id },
    { $push: { runlog: req.body } }
  );

  res.status(200).send(updatedRunLog);
};

exports.getRunsByDate = async (req, res, next) => {
  const { _id } = req.user;

  //Return dates between two dates
  const aggregatedData = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        runlog: {
          $filter: {
            input: '$runlog',
            as: 'runlog',
            cond: {
              $and: [
                { $gte: ['$$runlog.date', new Date('2019-03-31')] },
                { $lte: ['$$runlog.date', new Date('2019-04-10')] },
              ],
            },
          },
        },
      },
    },
  ]);

  const runs = aggregatedData[0].runlog;

  return res.status(200).json({ runs: runs.runlog });
};

exports.getThisWeeksRuns = async (req, res, next) => {
  const { _id } = req.user;

  console.log(_id);
  const aggregatedData = await User.aggregate([
    { $match: { _id: _id } },
    {
      $project: {
        runlog: {
          $filter: {
            input: '$runlog',
            as: 'runlog',
            cond: { $eq: ['$$runlog.week', { $isoWeek: new Date() }] },
          },
        },
      },
    },
  ]);

  const thisWeeksRuns = aggregatedData[0].runlog;

  return res.status(200).json({ runs: thisWeeksRuns });
};
