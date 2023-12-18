const mongoose = require("mongoose");
// require typeSubsidy
const TYPE_SUBSIDY = require("../constants/typeSubsidy.constants");
const { boolean } = require("joi");

const subsidySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  typeSubsidy: {
    type: String,
    required: true,
    enum: TYPE_SUBSIDY, // Lista de tipos permitidos
  },
  guidelineId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Guideline",
  },
  archive: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true,
});

module.exports = mongoose.model("Subsidy", subsidySchema);
