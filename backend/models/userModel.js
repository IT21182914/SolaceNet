// backend/src/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ['user', 'therapist'],
    default: 'user',
  },
  helpTips: [{
    sender: String, // Store the sender information as well
    message: String,
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
