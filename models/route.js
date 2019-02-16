const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  userId: String,
  elevationData: [
    [
      {
        elevation: Number,
        distance: Number,
      },
    ],
  ],
  startPoint: [Number],
  endPoint: [Number],
  viewport: {
    latitude: Number,
    longitude: Number,
    zoom: Number,
    bearing: Number,
    pitch: Number,
  },
  pointFeatures: [
    {
      type: String,
      properties: {
        color: String,
      },
      geometry: {
        type: String,
        coordinates: [Number],
      },
    },
  ],
  lineFeatures: [
    {
      type: String,
      properties: {
        color: String,
      },
      geometry: {
        type: String,
        coordinates: [[Number]],
      },
    },
  ],
  distance: [Number],
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
