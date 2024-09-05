const admin = require('firebase-admin');

// Path to your service account key file (download from Firebase console)
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
});

module.exports = admin;
