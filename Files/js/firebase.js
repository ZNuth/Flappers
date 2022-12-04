const firebaseObj = {}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

function teste ()  {
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
    firebaseObj["app"] = new initializeApp(firebaseConfig);
    firebaseObj["db"] = getFirestore(firebaseObj)
}

console.log(firebaseObj)

const conferir = async () => {
    
    const idLocal = localStorage.getItem('Player-ID')
    if (idLocal == "undefined" || idLocal == null){
        try {
            const valoresPlayers = await addDoc(collection(firebaseObj.db, "players"), {
                email: "",
                nivel: 0,
                exp: 0,
                money: 0
            });

            localStorage.setItem('Player-ID', valoresPlayers.id)

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}