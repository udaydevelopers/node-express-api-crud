const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Expire the token in 7 days
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

// Example usage
const saveRefreshToken = async (token, userId) => {
  const refreshToken = new RefreshToken({ token, userId });
  await refreshToken.save();
};

const findRefreshToken = async (token) => {
  return RefreshToken.findOne({ token });
};

module.exports = { saveRefreshToken, findRefreshToken };