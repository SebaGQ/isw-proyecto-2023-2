const mongoose = require("mongoose");
const AVAILIBILITY = require("../constants/availability.constants");

/** Declara la estructura del documento */
const appealSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Application",
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: AVAILIBILITY,
  },
}, {
  timestamps: true,
});

const Appeal = mongoose.model("Appeal", appealSchema);

module.exports = Appeal;
