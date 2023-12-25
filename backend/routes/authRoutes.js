const express = require('express');
const { createUser, loginUser, getAllUsers } = require('../controllers/authController');
const router = express.Router();

// User Registration Route
router.post('/register', createUser);

// User Login Route
router.post('/login', loginUser);

// Admin-only route to get all users
router.get('/users', getAllUsers);

module.exports = router;