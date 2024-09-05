const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// Sign-up route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Get the logged-in user
router.get('/user', authMiddleware, authController.getUser);

module.exports = router;
