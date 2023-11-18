const mongoose = require("mongoose");
const AVAILABILITY = require("../constants/availability.constants");

const reviewSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    comment: [{
        type: String,
        required: true,
    }],
    status: {
        type: String,
        required: true,
        enum: AVAILABILITY,
        default: AVAILABILITY[0],
    },
    statusPercentage: {
        type: Boolean,
        required: true,
        default: true,
    },
    statusMembers: {
        type: Boolean,
        required: true,
        default: true,
    },
    statusDate: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true,
    });

module.exports = mongoose.model("Review", reviewSchema);
