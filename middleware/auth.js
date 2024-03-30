const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token.split(' ')[1], jwt_secret_key, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
