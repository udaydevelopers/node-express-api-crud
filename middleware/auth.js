const jwt = require('jsonwebtoken');
const { findRefreshToken } = require('./refreshTokenModel');
const jwt_secret_key = process.env.JWT_SECRET_KEY;
const jwt_refresh_secret_key = process.env.JWT_REFRESH_SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token.split(' ')[1], jwt_secret_key, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token expired, try refreshing
        const refreshToken = req.headers['x-refresh-token'];
        if (!refreshToken) {
          return res.status(403).json({ message: 'Refresh token is required' });
        }

        try {
          const decodedRefreshToken = jwt.verify(refreshToken, jwt_refresh_secret_key);
          const storedRefreshToken = await findRefreshToken(decodedRefreshToken.userId);

          if (!storedRefreshToken || storedRefreshToken.token !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
          }

          const newAccessToken = jwt.sign({ id: decodedRefreshToken.userId }, jwt_secret_key, { expiresIn: '1h' });
          req.headers.authorization = `Bearer ${newAccessToken}`;
          next();
        } catch (err) {
          console.error(err);
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
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