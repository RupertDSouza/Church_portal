const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log("Connection successful");
  } catch {
    console.log("Connection failed");
  }
};

module.exports = connectToDatabase;
