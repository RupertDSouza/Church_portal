const mongoose = require("mongoose");

const massInfoSchema = new mongoose.Schema({
  title: String,     // e.g. "1st Mass"
  time: String,     // e.g. "6:30 AM"
  date: Date,       // optional — for special dates
  occasion: String,     // optional — e.g. "Christmas"
});

const massSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
    unique: true,       // one document per day
  },
  masses: [massInfoSchema],
});

module.exports = mongoose.model("Mass", massSchema);