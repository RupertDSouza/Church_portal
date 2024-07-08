const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({ 
    eventName: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
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

    const Event = new mongoose.model("Event", eventSchema);

    module.exports = Event;