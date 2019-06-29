const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

exports.uploadImage = (req, res) => {
  const { _id } = req.user;

  const key = `${_id}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'run-tracker-bucket',
      ContentType: 'image/jpeg',
      Key: key,
    },
    (err, url) => res.send({ key, url })
  );
};
