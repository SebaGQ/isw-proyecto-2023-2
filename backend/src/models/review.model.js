const mongoose = require("mongoose");
const AVAILABILITY = require("../constants/availability.constants");

const reviewSchema = new mongoose.Schema({
    // El review deberia tener un applicationId o un appealId
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: false,
    },
    appealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: false,
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
    origin: {
        type: String,
        required: true,

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
    socialPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    members: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);
