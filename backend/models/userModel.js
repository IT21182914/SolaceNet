// backend/src/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String, // Store hashed password
  email: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Set the default role to 'user'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;