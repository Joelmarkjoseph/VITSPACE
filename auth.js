// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP4hIK37jzryfsWKTWgQ6GpThhmU2yUD8",
    authDomain: "vitspace-c8be8.firebaseapp.com",
    projectId: "vitspace-c8be8",
    storageBucket: "vitspace-c8be8.appspot.com",
    messagingSenderId: "889700945135",
    appId: "1:889700945135:web:318f70958ea5edcc4d9f1a",
    measurementId: "G-HY40QP74YH",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check user authentication and show blur if not logged in
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // Add blur effect to the page and show the login button
            document.body.classList.add("blurred");
            showLoginOverlay();
        } else {
            // Remove blur effect if user is authenticated
            document.body.classList.remove("blurred");
            hideLoginOverlay();
        }
    });
}

// Display the login overlay with a button
function showLoginOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "login-overlay";
    overlay.innerHTML = `
      <div class="overlay-content">
        <p>Please log in to proceed</p>
        <button id="login-button">Login</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Attach event to the login button
    document.getElementById("login-button").addEventListener("click", () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => {
                // Authentication successful, blur should be removed by checkAuth
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    });
}

// Remove the login overlay once authenticated
function hideLoginOverlay() {
    const overlay = document.getElementById("login-overlay");
    if (overlay) {
        overlay.remove();
    }
}

// Run checkAuth when the page loads
document.addEventListener("DOMContentLoaded", checkAuth);
