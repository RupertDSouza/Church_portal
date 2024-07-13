const mongoose = require("mongoose");

const priestSchema = new mongoose.Schema({
  priestName: {
    type: String,
    require: [true, "Name is Required"],
  },
  image: {
    type: String,
    require: false,
  },
  fromDate: {
    type: Date,
    require: true,
  },
  toDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  contact: {
    type: Number,
  },
});
const priest = new mongoose.model("Priest", priestSchema);

module.exports = priest;
