const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  wardName: {
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
  place: {
    type: String,
    required: true,
  },
});

const ward = new mongoose.model("Ward", wardSchema);

module.exports = ward;
