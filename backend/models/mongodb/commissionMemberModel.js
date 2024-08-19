const mongoose = require("mongoose");

const commissionMemberSchema = new mongoose.Schema({
  category: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  designation: {
    type: String,
    required: [true, "Details is required"],
  },
  image: {
    type: String,
  },
});

const commissionMember = new mongoose.model("CommissionMember", commissionMemberSchema);

module.exports = commissionMember;
