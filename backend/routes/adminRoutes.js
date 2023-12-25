const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to get all users with role 'user'
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update a user by ID
router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { name }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to delete a user by ID
router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.put('/users/:userId/loyaltyPoints', async (req, res) => {
    const userId = req.params.userId;
    const { pointsToAdd } = req.body;
  
    try {
      // Fetch the user by ID
      const user = await User.findById(userId);
  
      // Check if the user is defined and has the 'user' role
      if (!user || user.role !== 'user') {
        return res.status(404).json({ success: false, message: 'User not found or does not have the user role' });
      }
  
      // Update loyalty points
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { loyaltyPoints: pointsToAdd } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error('Error updating loyalty points:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
  
  
  
  

module.exports = router;