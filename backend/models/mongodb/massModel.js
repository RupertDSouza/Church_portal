const mongoose = require("mongoose");

const specialMassSchema = new mongoose.Schema({
  occasion: String,
  date: Date,
  time: String,
});

const regularMassSchema = new mongoose.Schema({
  day: {
    type: String,
    require: true,
  },
  info: {
    type: [specialMassSchema],
    require: true,
  },
});

const mass = new mongoose.model("Mass", regularMassSchema);

module.exports = mass;
