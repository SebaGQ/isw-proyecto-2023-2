const mongoose = require('mongoose');
const AVAILIBILITY = require("../constants/availability.constants");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subsidyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Subsidy'
  },
  status: {
    type: String,
    required: true,
    enum: AVAILIBILITY,
    default: "Pendiente"
  },
  socialPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  applicationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
}, {
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;