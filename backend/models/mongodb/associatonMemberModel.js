const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
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

const member = new mongoose.model("Member", memberSchema);

module.exports = member;
