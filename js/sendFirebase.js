
import {db, setDoc, doc, getDocs, collection} from  "./firebase.js";
export {cadastrarUser, atualizarDados}

async function verificarDisponibilidadeUser (user){
    var disponibilidade = true
    const querySnapshot = await getDocs(collection(db, "players"));
    querySnapshot.forEach((doc) => {
        if (doc.data()["user"] == user){
            disponibilidade = false
        }
    });

    return disponibilidade
}

const cadastrarUser = async (User,senhaUser) => {
    const docRef = doc(db, "players", localStorage.getItem('Player-ID'));
    
    if ((await verificarDisponibilidadeUser(User)).valueOf()){
        setDoc(docRef,{
            "user": User,
            "password": senhaUser
        }, { merge: true })
        alert("Cadastro Efetuado com Sucesso!")
    } else {
        alert("Usuario ja Cadastrado")
    }
}

const atualizarDados = () => {
    const docRef = doc(db, "players", localStorage.getItem("Player-ID"))
    
    setDoc(docRef,{
        "exp" : localStorage.getItem("exp"),
        "nivel" : localStorage.getItem("nivel"),
        "money" : localStorage.getItem("money"),
    }, { merge: true })
}