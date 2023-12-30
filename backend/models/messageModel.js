// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model for therapists
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
