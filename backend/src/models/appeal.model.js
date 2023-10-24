const mongoose = require('mongoose');

/**Declara la estructura del documento */
const appealSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Application'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reason: { 
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['En Revisión', 'Aceptado', 'Rechazado'],
    default: 'En Revisión'
  }
}, {
  timestamps: true
});

const Appeal = mongoose.model('Appeal', appealSchema);

module.exports = Appeal;
