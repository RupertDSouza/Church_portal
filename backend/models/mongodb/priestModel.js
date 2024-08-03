const mongoose = require("mongoose");

const priestSchema = new mongoose.Schema({
  name: {
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
  dateOfOrdination: {
    type: Date,
  },
  description: {
    type: String,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
  },
});
const priest = new mongoose.model("Priest", priestSchema);

module.exports = priest;
