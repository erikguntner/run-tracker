const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  distance: { type: String, required: true },
  date: { type: Date, required: true },
  hrs: { type: String, required: true },
  mins: { type: String, required: true },
  month: { type: Number },
  secs: { type: String, required: true },
  week: { type: Number },
});

module.exports = runSchema;
