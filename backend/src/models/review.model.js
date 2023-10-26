const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    applicationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true
    },
        modificationDate: {
        type: Date,
        default: Date.now
    },
        comment: {
        type: String,
        required: true
    },
    
});
module.exports = mongoose.model("Review", reviewSchema);