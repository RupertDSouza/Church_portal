const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

const poster = new mongoose.model("Poster", posterSchema);

module.exports = poster;
