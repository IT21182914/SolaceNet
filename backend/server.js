// backend/server.js
const express = require('express');
const mongoose = require('./db/conn');
const therapistRoutes = require('./routes/therapistRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();
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
    app.listen(PORT, () => {
      console.log(`\nServer is running on PORT: ${PORT} 🔥`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });
