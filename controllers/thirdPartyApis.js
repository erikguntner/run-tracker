const axios = require('axios');

exports.getLocations = (req, res) => {
  const { startLat, startLong, newLat, newLong, transportationType } = req.body;

  axios
    .get(
      `https://graphhopper.com/api/1/route?point=${startLat},${startLong}&point=${newLat},${newLong}&vehicle=${transportationType}&debug=true&key=${process.env.GRAPH_HOPPER_KEY}&type=json&points_encoded=false`
    )
    .then(response => {
      return res.send(response.data);
    })
    .catch(err => {
      return res.status(400).send(err);
    });
};

exports.getElevation = (req, res) => {
  const { pointString, numberOfPoints } = req.body;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/elevation/json?path=${pointString}&samples=${numberOfPoints}&key=${process.env.GOOGLE_MAPS_ELEVATION_KEY}`,
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
    )
    .then(response => res.send(response.data))
    .catch(err => res.status(400).send(err));
};
