const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dsouza11anish:HZ31ujbRTLK4IYGO@churchcluster.xhhzuh0.mongodb.net/Church"
    );
    console.log("Connection successful");
  } catch {
    console.log("Connection failed");
  }
};

module.exports = connectToDatabase;
