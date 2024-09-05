const connectDB = require('./config/db');
const express = require('express');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Use .env for secrets

const jwtSecret = process.env.JWT_SECRET;

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parses incoming JSON requests

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));