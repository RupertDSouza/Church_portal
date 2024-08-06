const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  category: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  designation: {
    type: String,
    required: [true, "Details is required"],
  },
  image: {
    type: String,
  },
});

const association = new mongoose.model("Association", associationSchema);

module.exports = association;
