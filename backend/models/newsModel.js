const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    newsTitle: {
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
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    });

    const News = new mongoose.model("News", newsSchema);

    module.exports = News;