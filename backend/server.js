// backend/server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('./db/conn');
const therapistRoutes = require('./routes/therapistRoutes');
const User = require('./models/userModel');
const Message = require('./models/messageModel');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors());

// Use therapist routes
app.use('/api', therapistRoutes);

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
        // Broadcast the message to the specific room (therapist)
        io.to(data.room).emit('newMessage', data);

        // Save the message to the database
        const { room, sender, content } = data;

        if (room !== 'therapist-room') {
          // User is sending a message
          const user = await User.findOne({ _id: room });
          const therapist = await User.findOne({ _id: data.room });

          // Save the chat message for both user and therapist
          user.helpTips.push({ sender, message: content });
          therapist.helpTips.push({ sender, message: content });

          await user.save();
          await therapist.save();

          // Save the message in MongoDB
          await Message.create({
            sender,
            content,
            timestamp: new Date(),
            therapist: therapist._id,
          });
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    // Express route for handling chat messages
    app.post('/api/chat/send', async (req, res) => {
      try {
        const { sender, content, therapistId } = req.body;

        // Store the message in MongoDB
        const newMessage = await Message.create({
          sender,
          content,
          timestamp: new Date(),
          therapist: therapistId,
        });

        // Emit a real-time update using Socket.io
        io.to(therapistId).emit('newMessage', newMessage);

        res.status(200).json({ message: 'Message sent successfully' });
      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Express route for handling fetching messages
    app.get('/api/messages', async (req, res) => {
      try {
        // Fetch messages from the database or any other data source
        // Replace the following line with your actual logic to fetch messages
        const fetchedMessages = await Message.find(); // Example: fetching all messages
    
        // Respond with the fetched messages
        res.status(200).json({ messages: fetchedMessages });
      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    server.listen(PORT, () => {
      console.log(`\nServer is running on PORT: ${PORT} 🔥`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });
