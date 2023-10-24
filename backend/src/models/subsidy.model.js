const mongoose = require('mongoose');

const subsidySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  deadline: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Tipo1', 'Tipo2', 'Tipo3'], // Lista de tipos permitidos
    default: 'Tipo1' // Valor por defecto
  },
  guidelineId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Guideline'
  },
}, {
  timestamps: true
});

const Subsidy = mongoose.model('Subsidy', subsidySchema);

module.exports = Subsidy;