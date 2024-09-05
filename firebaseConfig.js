// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN0cGJ7Brza_GUJiFIzFURaeis5Ykyr2c",
  authDomain: "pharmai-d81af.firebaseapp.com",
  projectId: "pharmai-d81af",
  storageBucket: "pharmai-d81af.appspot.com",
  messagingSenderId: "332997353967",
  appId: "1:332997353967:web:6e9d25d1387a470584961a",
  measurementId: "G-N0BD753TYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
