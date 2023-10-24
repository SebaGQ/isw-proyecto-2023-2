const mongoose = require('mongoose');

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
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Appeal = mongoose.model('Appeal', appealSchema);

module.exports = Appeal;
