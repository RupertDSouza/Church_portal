const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    require: [true, "Name is Required"],
  },
  description: {
    type: String,
    require: [true, "Details is Required"],
  },
  image: {
    type: String,
  },
});

const institution = new mongoose.model("Institution", institutionSchema);

module.exports = institution;
