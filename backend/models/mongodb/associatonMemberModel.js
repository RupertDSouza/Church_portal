const mongoose = require("mongoose");

const associationMemberSchema = new mongoose.Schema({
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

const associationMember = new mongoose.model("AssociationMember", associationMemberSchema);

module.exports = associationMember;
