module.exports = (io) => {
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
          // ... Add your logic for therapist help tip
        } else {
          // User is sending a message
          // ... Add your logic for saving chat messages for user and therapist
        }
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };
  