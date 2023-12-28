const express = require('express');
const { createUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/authController');
const router = express.Router();

// User Registration Route
router.post('/register', createUser);

// User Login Route
router.post('/login', loginUser);

// Get user by ID
router.get('/users/:userId', getUserById);

// Update user details by ID
router.put('/users/:userId', updateUserById);

// Delete user by ID
router.delete('/users/:userId', deleteUserById);

// Admin-only route to get all users
router.get('/users', getAllUsers);

module.exports = router;
