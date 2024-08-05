const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

const document = new mongoose.model("Documents", gallerySchema);

module.exports = document;
