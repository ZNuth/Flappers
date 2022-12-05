
import {getDocs,getDoc, collection, addDoc, db,doc} from  "./firebase.js";
export {conferir, setDadosLocal}

async function conferir() {
    const idLocal = localStorage.getItem('Player-ID');
    var idCadastrado
   
    const querySnapshot = await getDocs(collection(db, "players"));
    querySnapshot.forEach((doc) => {
        idCadastrado = (doc.id == idLocal) 
        if (idCadastrado){return}
    });

    if (!idCadastrado) {
        try {
            const valoresPlayers = await addDoc(collection(db, "players"), {
                user: null,
                password: null,
                nivel: 0,
                exp: 0,
                money: 0
            });

            localStorage.setItem('Player-ID', valoresPlayers.id);

        } catch (e) {
            console.log("Error adding document: ", e);
        }
    }
}


async function setDadosLocal(idPlayer){
    const docRef = doc(db, "players", idPlayer);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()

    for (const key in data){
        if (data[key] != null){
            localStorage.setItem(key, data[key]);
        }
    }
}


async function carregarDadosLocal(idPlayer,data){
    const docRef = doc(db, "players", idPlayer);
    const docSnap = await getDoc(docRef);

    for (const key in data){
        if (data[key] != null){
            localStorage.setItem(key, data[key]);
        }
    }
}



