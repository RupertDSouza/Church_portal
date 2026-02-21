const mongoose = require("mongoose");

const priestSchema = new mongoose.Schema({
  messageTitle: {
    type: String,
    require: [true, "Message Title is Required"],
  },
  messageDescription: {
    type: String,
    require: [true, "Message Description is Required"],
  },
  image: {
    type: String,
    require: false,
  },
});
const priest = new mongoose.model("Priest", priestSchema);

module.exports = priest;
