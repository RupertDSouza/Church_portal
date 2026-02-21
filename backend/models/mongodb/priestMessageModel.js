const mongoose = require("mongoose");

const priestMessageSchema = new mongoose.Schema({
  messageTitle: {
    type: String,
    require: [true, "Message Title is Required"],
  },
  messageDescription: {
    type: String,
    require: [true, "Message Description is Required"],
  },
  image: {
    type: String,
    require: false,
  },
});
const priestMessage = new mongoose.model("PriestMessage", priestMessageSchema);

module.exports = priestMessage;
