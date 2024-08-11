const mongoose = require("mongoose");

const commisionMemberSchema = new mongoose.Schema({
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

const commisionMember = new mongoose.model("CommisionMember", commisionMemberSchema);

module.exports = commisionMember;
