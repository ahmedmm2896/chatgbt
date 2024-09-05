// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

const firebaseConfig = {
    apiKey: AIzaSyCN0cGJ7Brza_GUJiFIzFURaeis5Ykyr2c,
    authDomain: d81af.firebaseapp.com,
    projectId: pharmai-d81af,
    storageBucket: pharmai-d81af.appspot.com,
    messagingSenderId: 332997353967,
    appId: 1:332997353967:web:6e9d25d1387a470584961a
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
