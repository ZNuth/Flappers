
import {db, setDoc,doc} from  "./firebase.js";
export {cadastrarUser}


const cadastrarUser = (User,senhaUser) => {
    var docRef = doc(db, "players", localStorage.getItem('Player-ID'));
    setDoc(docRef,{
        "user": User,
        "password": senhaUser
    }, { merge: true })

}