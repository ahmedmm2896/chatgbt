const admin = require('../firebase');

// Register a new user using Firebase Authentication
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    
    res.status(200).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a user (Firebase login is handled in the frontend, this is for token verification)
exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.status(200).json({ message: 'User authenticated successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ message: 'Authentication failed' });
  }
};

// Middleware to protect routes (you can modify this for specific use)
exports.isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};
