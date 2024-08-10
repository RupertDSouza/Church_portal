const mongoose = require("mongoose");

const parishcouncilSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
  },
  image: {
    type: String,
    require: [true, "Image is Required"],
  },
  designation: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
  },
});

const parishCouncil = new mongoose.model("Parish Council", parishcouncilSchema);

module.exports = parishCouncil;
