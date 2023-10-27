const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Review", reviewSchema);
