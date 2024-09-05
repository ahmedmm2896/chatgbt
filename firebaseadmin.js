const admin = require('firebase-admin');

// Import the service account key you provided (save it as serviceAccountKey.json in your project)
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pharmai-d81af.firebaseio.com" // Replace with your Firebase Realtime Database URL or Firestore URL
});

console.log("Firebase Admin SDK initialized successfully");

module.exports = admin;
