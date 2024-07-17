const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  associationName: {
    type: String,
    required: [true, "Name is required"],
  },
  details: {
    type: String,
    required: [true, "Details is required"],
  },
  image: {
    type: String,
  },
});

const association = new mongoose.model("Association", associationSchema);

module.exports = association;
