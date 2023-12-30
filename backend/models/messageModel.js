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
  chatSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession', // Assuming you have a 'ChatSession' model
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
