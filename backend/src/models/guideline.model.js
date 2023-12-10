const mongoose = require("mongoose");

const guidelineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  maxSocialPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  minMembers: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Guideline", guidelineSchema);
