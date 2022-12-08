import {cadastrarUser, atualizarDados} from "./sendFirebase.js"
import {logarUser} from "./getFirebase.js"

(function (){
    const modos = document.querySelectorAll("#Modos span")
    modos.forEach(modosButtons => {
        modosButtons.onclick = () => {
            modos[0].classList.remove("selecionado")
            modos[1].classList.remove("selecionado")
            modos[2].classList.remove("selecionado")

            modosButtons.classList.add("selecionado")
        }
    
        modos[0].onclick = (event) => {
            printarMensgem("opDesen",event)
        }

        modos[2].onclick = (event) => {
            printarMensgem("opDesen",event)
        }
    });

    const infos =  document.querySelectorAll("#Informacoes div")
    const link = document.getElementById("linkSections");
    const conteudo = document.getElementById("InfoADD");

    infos.forEach(element => {
        element.onclick = () => {
            conteudo.style.left = "0px"
            try{
                const HtmlElem = document.getElementById(`${element.getAttribute("id")}Conteudo`).innerHTML
                conteudo.innerHTML = HtmlElem;
                
                conteudo.style.display = "flex"
                conteudo.style.left =  `${element.offsetLeft}px`

                if (element.getAttribute("id") == "Perfil"){
                    const buttons = document.querySelectorAll(`#${conteudo.getAttribute("id")} button`)
                    buttons.forEach((e) => e.onclick = () => {
                        buttonFunction(e)
                    })

                    const inputs = document.querySelectorAll("#InfoADD input")
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
                }
            }
            catch (e){
                conteudo.style.display = "none"
                console.error("Error: " + e.toString())
            }
        }    
    });

    const barraInfo = document.getElementById("Informacoes")
    document.addEventListener("click",(e) => {
        const ativador = e.target
        if (!barraInfo.contains(ativador) && conteudo.style.display == "flex" ){
            conteudo.style.display = "none"
            conteudo.style.left = "0px"
        }
    })    
    
    function buttonFunction (elem) {
        const tituloTela = document.querySelector("#InfoADD h4")
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

    function printarMensgem (tipo,element){
        var txt;
        const boxMensagem = document.getElementById("Mensagem")

        if (tipo == "opDesen"){
            txt = "Essa opção esta em desenvolvimento!"
        }

        boxMensagem.style.display = "flex"
        boxMensagem.innerHTML = txt
        
        var posX = element.clientX,
            posY = element.clientY;

        boxMensagem.style.left = `${posX}px`;
        boxMensagem.style.top =`${posY}px`;        
        
        setTimeout(() => {
            boxMensagem.style.display = "none"
            boxMensagem.innerHTML = ""}, 1270)
    }

    document.getElementById("BoxShop").onclick = (event) => printarMensgem("opDesen",event)
    document.getElementById("BoxMoney").onclick = (event) => printarMensgem("opDesen",event)
    document.getElementById("PlayerInfo").onclick = (event) => printarMensgem("opDesen",event)

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
        logarUser(inputs.user,inputs.password)
    }

    const Cadastro = () => {
        const inputs = valoresInputs()
        cadastrarUser(inputs.user,inputs.password)
    }
})()