// Universal Authentication Protection
// This script must be included in all pages that require authentication

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAP4hIK37jzryfsWKTWgQ6GpThhmU2yUD8",
    authDomain: "vitspace-c8be8.firebaseapp.com",
    projectId: "vitspace-c8be8",
    storageBucket: "vitspace-c8be8.appspot.com",
    messagingSenderId: "889700945135",
    appId: "1:889700945135:web:318f70958ea5edcc4d9f1a",
    measurementId: "G-HY40QP74YH",
    databaseURL: "https://vitspace-c8be8-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to check authentication and redirect if not logged in
function requireAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // User is not authenticated, redirect to login page
            console.log("User not authenticated, redirecting to login page");
            window.location.href = "loginpg.html";
        } else {
            // User is authenticated, store user info
            localStorage.setItem("email", user.email);
            localStorage.setItem("userUID", user.uid);
            console.log("User authenticated:", user.displayName);
        }
    });
}

// Function to check if current page is login page
function isLoginPage() {
    const currentPage = window.location.pathname.split('/').pop();
    return currentPage === 'loginpg.html' || currentPage === '';
}

// Function to check if current page should be protected
function shouldProtectPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = [
        'year1.html', 'year2.html', 'year3.html', 'year4.html',
        'bujji.html', 'webcrs.html', 'pythoncrs.html',
        'week1.html', 'week2.html', 'week3.html', 'week4.html', 'week5.html',
        'week6.html', 'week7.html', 'week8.html', 'week9.html', 'week10.html',
        'week11.html', 'week12.html', 'links.html', 'quizindex.html',
        'bujjiweb.html', 'humanbot.html', 'worshifyapp.html', 'index2.html',
        'vitspaceapp.html', 'programs.html', 'lab.html', 'myppt.html',
        'Vitspacecontest.html', 'mindex.html', 'feed.html', 'freecourses.html',
        'year3new.html', 'foundabug.html'
    ];
    
    // Also protect all unit pages
    const isUnitPage = currentPage.includes('UNIT') || currentPage.includes('unit') || 
                      currentPage.includes('PPDS') || currentPage.includes('AI-UNIT') ||
                      currentPage.includes('ANN') || currentPage.includes('MPMC') ||
                      currentPage.includes('dbms') || currentPage.includes('DBMS') ||
                      currentPage.includes('COMMUNICATION') || currentPage.includes('iot') ||
                      currentPage.includes('Chem') || currentPage.includes('ADS');
    
    return protectedPages.includes(currentPage) || isUnitPage;
}

// Main authentication check
function initAuth() {
    // Don't protect login page itself
    if (isLoginPage()) {
        console.log("Login page detected, skipping auth check");
        return;
    }
    
    // Check if current page should be protected
    if (shouldProtectPage()) {
        console.log("Protected page detected, checking authentication");
        requireAuth();
    } else {
        console.log("Public page detected, no auth required");
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener("DOMContentLoaded", initAuth);

// Also check immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, run immediately
    initAuth();
}
