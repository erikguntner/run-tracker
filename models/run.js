const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  distance: { type: Number, required: true },
  date: { type: Date, required: true },
  hrs: { type: Number, required: true },
  mins: { type: Number, required: true },
  month: { type: Number },
  secs: { type: Number, required: true },
  week: { type: Number },
});

module.exports = runSchema;
