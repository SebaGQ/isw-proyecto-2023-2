const mongoose = require("mongoose");
const AVAILIBILITY = require("../constants/availability.constants");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // Se agrega a la postulacion un array de rut, para que la persona pueda agregar los rut de los miembros de su familia.
  rut:[{
    type: String,
    required: true,
  }],
  subsidyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subsidy",
  },
  status: {
    type: String,
    required: true,
    enum: AVAILIBILITY,
    default: AVAILIBILITY[3],
  },
  socialPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  applicationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  members: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true,
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
