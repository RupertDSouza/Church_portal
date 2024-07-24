const mongoose = require("mongoose");

const churchSchema = new mongoose.Schema({
  churchName: {
    type: String,
    required: [true, "Name is required"],
  },
  history: {
    type: String,
  },
  details: {
    type: String,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
    require: true,
  },
});

const church = new mongoose.model("Church", churchSchema);

module.exports = church;
