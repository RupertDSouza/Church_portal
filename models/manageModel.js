const mongoose = require("mongoose");

const manageSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

const Manage = new mongoose.model("Manage", manageSchema);

module.exports = Manage;
