const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Details is required"],
  },
  image: {
    type: String,
  },
});

const commission = new mongoose.model("Commission", commissionSchema);

module.exports = commission;
