Copy code
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); // Use the controllers for logic
const authMiddleware = require('../middleware/auth'); // Import the auth middleware

// Sign-up route
router.post('/signup', authController.register);

// Login route
router.post('/login', authController.login);

// Get the logged-in user
router.get('/user', authMiddleware, authController.getUser);

// Example protected route (for testing the middleware)
router.get('/profile', authMiddleware, (req, res) => {
  res.send('Welcome to your profile');
});

module.exports = router;
