const mongoose = require("mongoose");
const contact = require("./contactModel");

const parishcouncilSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
  },
  image: {
    type: String,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: contact,
  },
});

const parishCouncil = new mongoose.model("Parish Council", parishcouncilSchema);

module.exports = parishCouncil;
