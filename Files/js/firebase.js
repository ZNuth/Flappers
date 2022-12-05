import {  initializeApp } from  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"
export {firebase}

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHnTM21JLSLzp5mZIhFsimtKjUiIRVM3I",
    authDomain: "flappers-8f098.firebaseapp.com",
    projectId: "flappers-8f098",
    storageBucket: "flappers-8f098.appspot.com",
    messagingSenderId: "818410072736",
    appId: "1:818410072736:web:549334d06d13f24791b7c5"
};

// Initialize Firebase
const firebase = await initializeApp(firebaseConfig)
