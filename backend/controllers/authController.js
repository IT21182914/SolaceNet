const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Array to store refresh tokens
let refreshTokens = [];

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log received credentials
    console.log('Received credentials:', { username, password });

    const validUser = await User.findOne({ name: { $regex: new RegExp(`^${username}$`, 'i') } });

    console.log('Valid user:', validUser);

    if (!validUser) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check the hashed password
    const passwordMatch = await bcrypt.compare(password, validUser.password);

    if (!passwordMatch) {
      console.log('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simplify the user object for token generation
    const { _id, name, role } = validUser;
    const user = { _id, name, role };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ userId: _id, role }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
};






// Admin-only route to get all users
const getAllUsers = async (req, res) => {
  try {
    // Check if the user making the request has the 'admin' role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }

    // Retrieve all users from the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};