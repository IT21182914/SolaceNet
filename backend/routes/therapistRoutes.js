// backend/src/routes/therapistRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to get all therapists
router.get('/therapists', async (req, res) => {
  try {
    const therapists = await User.find({ role: 'therapist' });
    res.status(200).json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update therapist details by ID
router.put('/therapists/:therapistId', async (req, res) => {
  const therapistId = req.params.therapistId;
  const { name } = req.body;

  try {
    const updatedTherapist = await User.findByIdAndUpdate(
      therapistId,
      { name },
      { new: true }
    );

    if (!updatedTherapist) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }

    res.status(200).json({ success: true, therapist: updatedTherapist });
  } catch (error) {
    console.error('Error updating therapist:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to delete a therapist by ID
router.delete('/therapists/:therapistId', async (req, res) => {
  const therapistId = req.params.therapistId;

  try {
    const deletedTherapist = await User.findByIdAndDelete(therapistId);

    if (!deletedTherapist) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }

    res.status(200).json({ success: true, therapist: deletedTherapist });
  } catch (error) {
    console.error('Error deleting therapist:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
