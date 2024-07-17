const mongoose = require("mongoose");
const hashMiddleware = require("../../middleware/hashMiddleware");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

userSchema.pre("save", hashMiddleware);

const user = new mongoose.model("User", userSchema);

module.exports = user;
