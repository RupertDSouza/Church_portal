const mongoose = require("mongoose");

const commisionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Details is required"],
  },
  image: {
    type: String,
  },
});

const commision = new mongoose.model("Commision", commisionSchema);

module.exports = commision;
