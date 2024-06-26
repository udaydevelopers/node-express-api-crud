const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, jwt_secret_key, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const refreshTokens = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.id;
  
      const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ accessToken });
    } catch (error) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  };
  

module.exports = { registerUser, login, refreshTokens };
