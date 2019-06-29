const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

exports.uploadImage = (req, res) => {
  const { _id } = req.user;
  const { image } = req;
  // const buf = new Buffer(image, 'base64');
  // console.log(buf);

  const key = `${_id}/${uuid()}.jpeg`;

  var params = {
    Bucket: 'run-tracker-bucket',
    Key: key,
    Body: image,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
  };

  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
    } else {
      console.log('succesfully uploaded the image!');
      res.send(data);
    }
  });

  // s3.putObject(data, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //     console.log('Error uploading data: ', data);
  //   } else {
  //     console.log('succesfully uploaded the image!');
  //     res.send(data);
  //   }
  // });

  // s3.getSignedUrl(
  //   'putObject',
  //   {
  //     Bucket: 'run-tracker-bucket',
  //     ContentType: 'image/jpeg',
  //     Body: buf,
  //     Key: key,
  //   },
  //   (err, url) => res.send({ key, url, buf })
  // );
};
