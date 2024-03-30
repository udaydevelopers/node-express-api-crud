// userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const { registerUser, login } = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', login);

router.post('/change-password', verifyToken, async (req, res) => {
  // Implement change password
});

module.exports = router;
