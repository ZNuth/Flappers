
import firebase from "./firebase.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

const db = getFirestore(firebase)

const conferir = async () => {
    const idLocal = localStorage.getItem('Player-ID')
    if (idLocal == "undefined" || idLocal == null){
        try {
            const valoresPlayers = await addDoc(collection(db, "players"), {
                email: "",
                nivel: 0,
                exp: 0,
                money: 0
            });

            localStorage.setItem('Player-ID', valoresPlayers.id)
            return "Novo"

        } catch (e) {
            console.error("Error adding document: ", e);
            return "Erro"
        }
    }
}

