const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
  },
  dates: {
    type: String,
    required: [true, "Date is required"],
  },
});

const news = new mongoose.model("News", newsSchema);

module.exports = news;
