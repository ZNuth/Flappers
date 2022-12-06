import {cadastrarUser, atualizarDados} from "./sendFirebase.js"
import {logarUser} from "./getFirebase.js"

const ModoHistoria = document.getElementById("Historia")
const ModoLivre = document.getElementById("Livre")
const ModoMultiplayer = document.getElementById("Multiplayer")
const Modos = document.querySelectorAll(".Modo")

ModoHistoria.classList.add("Disabled")
ModoMultiplayer.classList.add("Disabled")


atualizarDados()

Modos.forEach((elem) => {
    elem.addEventListener("click",() => {
        if ("Disabled" == elem.classList[1]){
            alert("Modo não Disponivel")
        } else{
            document.querySelector(".Modos").classList.add("Disabled")
            document.querySelector(`#Container${elem.id}`).style.display = "flex"
        }
    })
})

const buttonLogin = document.querySelector('.Login')
buttonLogin.onclick = () => {
    if (buttonLogin.getAttribute("status") == "fechado"){
        document.querySelector('.ContainerLogin').style.display = "flex"
        buttonLogin.src = "../../images/x.png"
        buttonLogin.setAttribute("status","aberto")
    } else  if (buttonLogin.getAttribute("status") == "aberto"){
        document.querySelector('.ContainerLogin').style.display = "none"
        buttonLogin.src = "../../images/personIcon.png"
        buttonLogin.setAttribute("status","fechado")
    }
}

const inputs = document.querySelectorAll(".ContainerLogin input")
inputs.forEach((elem) => {
    
    elem.onclick = () => {
        (elem.parentElement).children[0].classList.add("Selecionado")
    }
    elem.onblur = () => {
        if (elem.value == ""){
        (elem.parentElement).children[0].classList.remove("Selecionado")
        }
    }
})

const valoresInputs = () => {
    const user = document.getElementById("usuario").value
    const password = document.getElementById("senha").value
    
    if (user == "" || password == ""){
        alert("Não deixe nenhum dos valores vazios")
        return false
    } else {
        return {user,password}
    }
}

const Login = () => {
    const inputs = valoresInputs()
    logarUser(inputs.user,inputs.password).then(txt =>{ 
        
        if (txt == "Login Efetuado com Sucesso!"){
            document.querySelector('.ContainerLogin').style.display = "none"
            buttonLogin.src = "../../images/personIcon.png"
            buttonLogin.setAttribute("status","Logado")
            buttonLogin.style.display = "none"
        }
    })
}

const Cadastro = () => {
    const inputs = valoresInputs()
    cadastrarUser(inputs.user,inputs.password)
}


const buttons = document.querySelectorAll(".ContainerLogin button")
buttons.forEach((elem) => {
    const tituloTela = document.querySelector(".ContainerLogin h4")
    elem.onclick = () => {
        if (tituloTela.innerHTML != `Realizar ${elem.getAttribute("value")}`){
            tituloTela.innerHTML = `Realizar ${elem.getAttribute("value")}`
    
            elem.parentNode.children[0].classList.remove("atual")
            elem.parentNode.children[1].classList.remove("atual")
            
            elem.classList.add("atual")
        } else {

            if(elem.getAttribute("value") == "Login") {Login()}
            if(elem.getAttribute("value") == "Cadastro") {Cadastro()}
        }
    }
})
    

