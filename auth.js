// Ensure Firebase is properly initialized
const firebaseConfig = {
    apiKey: AIzaSyCN0cGJ7Brza_GUJiFIzFURaeis5Ykyr2c,
    authDomain: pharmai-d81af.firebaseapp.com,
    projectId: pharmai-d81af,
    storageBucket: pharmai-d81af.appspot.com,
    messagingSenderId: 332997353967,
    appId: 1:332997353967:web:6e9d25d1387a470584961a
};

firebase.initializeApp(firebaseConfig);

// Handle Sign-Up
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed up successfully
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

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Logged in successfully
                const user = userCredential.user;
                console.log('User logged in:', user);
                window.location.href = 'dashboard.html';  // Redirect to dashboard
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    });
}

// Handle Logout (optional if you want to add logout functionality here)
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            window.location.href = 'login.html';  // Redirect to login after logout
        }).catch((error) => {
            console.error("Error during logout:", error);
        });
    });
}

// Check user auth state for dashboard protection
firebase.auth().onAuthStateChanged((user) => {
    if (!user && window.location.pathname.includes('dashboard.html')) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
});
