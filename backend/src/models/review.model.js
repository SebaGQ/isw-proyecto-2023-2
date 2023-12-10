const mongoose = require("mongoose");
const AVAILABILITY = require("../constants/availability.constants");

const reviewSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    comments: [{
        type: String,
        required: true,
    }],
    status: {
        type: String,
        required: true,
        enum: AVAILABILITY,
        default: AVAILABILITY[0],
      },
    origin:{
        type: String,
        required: true,

    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);
