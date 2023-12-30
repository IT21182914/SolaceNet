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
  helpTips: {
    type: [String], // Array of help tips provided by the therapist
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
