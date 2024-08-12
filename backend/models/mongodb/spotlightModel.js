const mongoose = require("mongoose");

const spotlightSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const spotlight = new mongoose.model("Spotlight", spotlightSchema);

module.exports = spotlight;
