const ModoHistoria = document.getElementById("Historia")
const ModoLivre = document.getElementById("Livre")
const ModoMultiplayer = document.getElementById("Multiplayer")
const Modos = document.querySelectorAll(".Modo")

ModoHistoria.classList.add("Disabled")
ModoMultiplayer.classList.add("Disabled")

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