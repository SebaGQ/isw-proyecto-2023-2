const mongoose = require("mongoose");

/** Declara la estructura de la revision de la apelacion */
const reviewAppealSchema = new mongoose.Schema({
  appealId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Appeal",
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const ReviewAppeal = mongoose.model("ReviewAppeal", reviewAppealSchema);

module.exports = ReviewAppeal;
