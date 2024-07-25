const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
  firstReading: {
    type: String,
  },
  secondReading: {
    type: String,
  },
  responsorialPsalm: {
    type: String,
  },
  gospel: {
    type: String,
  },
});

const readings = new mongoose.model("Readings", readingSchema);

module.exports = readings;
