import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Handle Sign-Up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                window.location.href = 'login.html';  // Redirect to login page
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User logged in:', user);
                window.location.href = 'dashboard.html';  // Redirect to dashboard
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });
}

// Check user auth state for dashboard protection
onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname.includes('dashboard.html')) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
});
