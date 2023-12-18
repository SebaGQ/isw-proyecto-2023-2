const mongoose = require("mongoose");
const AVAILABILITY = require("../constants/availability.constants");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  firstName:{
    type: String,
    required: true,
  },
  lastName1:{
    type: String,
    requiered: true,
  },
  lastName2:{
    type: String,
    required: true,
  },
  // Se agrega a la postulacion un array de rut, para que la persona pueda agregar los rut de los miembros de su familia.
  rutUser:{
    type: String,
    required: true,
  },
  subsidyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Subsidy",
  },
  status: {
    type: String,
    required: true,
    enum: AVAILABILITY,
    default: AVAILABILITY[3],
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
    min: 0,
  },
  rutsMembers: [{
    type: String,
    required: true,
    min: 0,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Application", applicationSchema);;
