// backend/src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to initiate a chat between a user and a therapist
router.post('/initiate-chat', async (req, res) => {
  const { userId, therapistId } = req.body;

  try {
    // Fetch the user and therapist from the database
    const user = await User.findById(userId);
    const therapist = await User.findById(therapistId);

    if (!user || !therapist) {
      return res.status(404).json({ success: false, message: 'User or therapist not found' });
    }

    // Create a new chat session and store it in the database
    const chatSession = {
      user: {
        id: user._id,
        name: 'Anonymous User', // You can customize this as needed
      },
      therapist: {
        id: therapist._id,
        name: therapist.name,
      },
      messages: [], // Initialize with an empty array of messages
    };

    // Add the chat session to the user and therapist
    user.chats.push(chatSession);
    therapist.chats.push(chatSession);

    // Save the changes to the database
    await user.save();
    await therapist.save();

    res.status(201).json({ success: true, chatSession });
  } catch (error) {
    console.error('Error initiating chat:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to get all chat sessions for a user
router.get('/user-chats/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('chats');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, chats: user.chats });
  } catch (error) {
    console.error('Error fetching user chats:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to get all chat sessions for a therapist
router.get('/therapist-chats/:therapistId', async (req, res) => {
  const therapistId = req.params.therapistId;

  try {
    const therapist = await User.findById(therapistId).populate('chats');

    if (!therapist) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }

    res.status(200).json({ success: true, chats: therapist.chats });
  } catch (error) {
    console.error('Error fetching therapist chats:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Add more chat routes as needed...

module.exports = router;
