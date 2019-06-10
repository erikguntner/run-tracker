const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  userId: String,
  image: String,
  elevationData: [
    [
      {
        elevation: Number,
        distance: Number,
      },
    ],
  ],
  startPoint: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [Number],
  },
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
      type: {
        type: { type: String },
      },
      properties: {
        color: String,
      },
      geometry: {
        type: {
          type: { type: String },
        },
        coordinates: [Number],
      },
    },
  ],
  lineFeatures: [
    {
      type: {
        type: { type: String },
      },
      properties: {
        color: String,
      },
      geometry: {
        type: {
          type: { type: String },
        },
        coordinates: [[Number]],
      },
    },
  ],
  distance: [Number],
});

// const Route = mongoose.model('Route', routeSchema);

module.exports = routeSchema;
