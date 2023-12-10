const mongoose = require("mongoose");
const AVAILABILITY = require("../constants/availability.constants");

/** Declara la estructura del documento */
const appealSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Application",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: {
    type: String,
    required: true,
    enum: AVAILABILITY,
    default : AVAILABILITY[0],
  },
  newSocialPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  newMembers: {
    type: Number,
    min: 1,
  },
  //El appeal no deberia tener los comentarios ni result, el review deberia tener comments
  comments: [{
    type: String,
  }],
  result: [{
    type: String,
  }],
}, {
  timestamps: true,
});

const Appeal = mongoose.model("Appeal", appealSchema);

module.exports = Appeal;
