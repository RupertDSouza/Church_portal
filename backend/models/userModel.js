const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"]
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
  phoneNumber: {
    type: Number,
    maxlength: 10,
    required: [true, "Phone number is required"],
  },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
