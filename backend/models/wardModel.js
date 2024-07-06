const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Ward = new mongoose.model("Ward", wardSchema);

module.exports = Ward;
