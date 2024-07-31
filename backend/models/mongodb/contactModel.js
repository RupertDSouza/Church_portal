const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  designation: {
    type: String,
  },
  contact: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
  },
});

const contact = new mongoose.model("Contact", contactSchema);

module.exports = contact;
