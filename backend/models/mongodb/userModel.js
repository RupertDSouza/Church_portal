const mongoose = require("mongoose");
const hashMiddleware = require("../../middleware/hashMiddleware");
const hashMiddlewareForUpdate = require("../../middleware/hashMiddlewareForUpdate");

const userSchema = new mongoose.Schema({
  name: {
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
  image: {
    type: String,
  },
});

userSchema.pre("save", hashMiddleware);
userSchema.pre("findOneAndUpdate", hashMiddlewareForUpdate);

const user = new mongoose.model("User", userSchema);

module.exports = user;
