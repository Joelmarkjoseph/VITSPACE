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
            
            // Show Prompy popup after successful login (only if not already shown)
            if (!localStorage.getItem('prompyPopupShown')) {
                setTimeout(() => {
                    showPrompyPopup();
                    localStorage.setItem('prompyPopupShown', 'true');
                }, 1000);
            }
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

// Function to show Prompy hackathon popup
function showPrompyPopup() {
    // Inject CSS styles if not already present
    if (!document.getElementById('prompy-popup-styles')) {
        const style = document.createElement('style');
        style.id = 'prompy-popup-styles';
        style.textContent = `
            .popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-in-out;
            }
            .popup-content {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                border-radius: 20px;
                padding: 0;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
                animation: slideIn 0.3s ease-out;
            }
            .popup-header {
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%);
                padding: 20px;
                border-radius: 20px 20px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .popup-header h2 {
                color: white;
                margin: 0;
                font-size: 2rem;
                font-weight: bold;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            .close-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            .popup-body {
                padding: 30px;
                color: white;
                text-align: center;
            }
            .popup-body h3 {
                color: #e0e7ff;
                font-size: 1.5rem;
                margin: 0 0 15px 0;
                font-weight: 600;
            }
            .popup-body p {
                color: #cbd5e1;
                margin: 0 0 25px 0;
                line-height: 1.6;
            }
            .features {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin: 25px 0;
            }
            .feature-item {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 12px;
                background: rgba(139, 92, 246, 0.1);
                border-radius: 10px;
                border: 1px solid rgba(139, 92, 246, 0.3);
            }
            .feature-icon {
                font-size: 1.2rem;
            }
            .call-to-action {
                margin: 25px 0;
                padding: 15px;
                background: rgba(168, 85, 247, 0.1);
                border-radius: 10px;
                border: 1px solid rgba(168, 85, 247, 0.3);
            }
            .call-to-action p {
                margin: 0;
                font-weight: 600;
                color: #fbbf24;
            }
            .popup-buttons {
                display: flex;
                gap: 15px;
                margin-top: 25px;
            }
            .btn-register, .btn-learn {
                flex: 1;
                padding: 12px 20px;
                border-radius: 10px;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
                display: inline-block;
                text-align: center;
            }
            .btn-register {
                background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
                color: white;
                border: none;
            }
            .btn-register:hover {
                background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);
            }
            .btn-learn {
                background: transparent;
                color: #8b5cf6;
                border: 2px solid #8b5cf6;
            }
            .btn-learn:hover {
                background: #8b5cf6;
                color: white;
                transform: translateY(-2px);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: scale(0.8) translateY(-50px);
                }
                to { 
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            @media (max-width: 600px) {
                .popup-content {
                    width: 95%;
                    margin: 10px;
                }
                .popup-buttons {
                    flex-direction: column;
                }
                .features {
                    gap: 10px;
                }
                .feature-item {
                    padding: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    const popup = document.createElement('div');
    popup.id = 'prompy-popup';
    popup.innerHTML = `
      <div class="popup-overlay">
        <div class="popup-content">
          <div class="popup-header">
            <h2>Prompy</h2>
            <button class="close-btn" onclick="closePrompyPopup()">&times;</button>
          </div>
          <div class="popup-body">
            <h3>5-Day Full-Stack AI Bootcamp</h3>
            <p>Master React JS, Flask & Supabase with AI-powered prompt engineering.</p>
            <div class="features">
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span>Daily Challenges</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>Live Leaderboard</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🏆</span>
                <span>Top 3 Recognition</span>
              </div>
            </div>
            <div class="call-to-action">
              <p>⚡ Learn. Build. Win. Get Featured on VITSPACE!</p>
            </div>
            <div class="popup-buttons">
              <a href="https://prompy.netlify.app" target="_blank" class="btn-register">Register Now</a>
              <a href="https://prompy.netlify.app" target="_blank" class="btn-learn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(popup);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        closePrompyPopup();
    }, 10000);
}

// Function to close Prompy popup
function closePrompyPopup() {
    const popup = document.getElementById('prompy-popup');
    if (popup) {
        popup.remove();
    }
}

// Run checkAuth when the page loads
document.addEventListener("DOMContentLoaded", checkAuth);
