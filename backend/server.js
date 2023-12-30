// backend/server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('./db/conn');
const therapistRoutes = require('./routes/therapistRoutes');
const User = require('./models/userModel');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

// Use therapist routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/auth', therapistRoutes);

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // WebSocket connection
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      // Handle chat messages
      socket.on('send-message', async (data) => {
        // Broadcast the message to all connected clients
        io.emit('receive-message', data);

        // Save the message to the database
        const { room, sender, message } = data;

        if (room === 'therapist-room') {
          // Therapist is sending a help tip
          const therapist = await User.findOne({ role: 'therapist' });
          therapist.helpTips.push(message);
          await therapist.save();
        } else {
          // User is sending a message
          const user = await User.findOne({ _id: room });
          const therapist = await User.findOne({ role: 'therapist' });
          
          // Save the chat message for both user and therapist
          user.helpTips.push({ sender, message });
          therapist.helpTips.push({ sender, message });

          await user.save();
          await therapist.save();
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    // Start the server
    server.listen(PORT, () => {
      console.log(`\nServer is running on PORT: ${PORT} 🔥`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });
