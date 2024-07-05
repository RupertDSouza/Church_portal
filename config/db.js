const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Manage");
    console.log("Connection successful");
  } catch {
    console.log("Connection failed");
  }
};

module.exports = connectToDatabase;
