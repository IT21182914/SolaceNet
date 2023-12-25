const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("./db/conn");
const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middlewares/authMiddleware");
const User = require("./models/userModel");
const cors = require('cors');
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

// Use authentication routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JWT Authentication

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;


  const validUser = await User.findOne({ name: username });

  if (!validUser || !(await validUser.isValidPassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = { name: validUser.name, role: validUser.role }; 

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}


app.get("/protected", authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: "This is a protected admin route" });
  } else {
    res.json({ message: "This is a protected user route" });
  }
});


app.listen(PORT, () => {
  console.log(`\n\nServer is running on PORT: ${PORT} 🔥`);
});