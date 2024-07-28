const e = require("express");
const mongoose = require("mongoose");

const obituarySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  born: {
    type: String,
  },
  died: {
    type: String,
  },
  age: {
    type: String,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const obituary = new mongoose.model("Obitury", obituarySchema);

module.exports = obituary;
