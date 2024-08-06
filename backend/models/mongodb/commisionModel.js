const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
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

const association = new mongoose.model("Association", associationSchema);

module.exports = association;
