const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const jwt_refresh_secret_key = process.env.JWT_REFRESH_SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token.split(' ')[1], jwt_secret_key, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token expired, try refreshing
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
          return res.status(403).json({ message: 'Refresh token is required' });
        }

        jwt.verify(refreshToken, jwt_refresh_secret_key, (err, decoded) => {
          if (err) {
            console.error(err);
            return res.status(403).json({ message: 'Invalid refresh token' });
          }

          // Generate new access token
          const newAccessToken = jwt.sign({ id: decoded.id }, jwt_secret_key, { expiresIn: '1h' });
          req.headers.authorization = `Bearer ${newAccessToken}`;
          next();
        });
      } else {
        console.error(err);
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = { verifyToken };
