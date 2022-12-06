
const Player = document.getElementById("Ave")
const Inimigo = document.querySelector("#Ave.inimigo")
const arvoreOBS = document.getElementById("Arvore")
const ratoPRESA = document.getElementById("Rato")

const ElemNivel = document.getElementById("Nivel")
var Nivel = ElemNivel.getAttribute("value")

const ElemExp = document.getElementById("Exp")
var maxExp = ElemExp.getAttribute("value-max")
var Exp = ElemExp.getAttribute("value")

const TextAtualExp = document.getElementById("exp_atual")
const TextMaxExp = document.getElementById("exp_max")
const TextNivel = document.getElementById("nivel_atual")

const ElemStam = document.querySelector(".Stam")
var maxStam = ElemStam.getAttribute("value-max")
var Stam = ElemStam.getAttribute("value")

const ElemVida = document.querySelector(".Vida")
var maxVida = ElemVida.getAttribute("value-max")
var Vida = ElemVida.getAttribute("value")

var porcentStam
var porcentVida
var porcentExp

var contador
var spawnRato
var tempoExpPassivo
var regenStam
var regenVida

var tempoMinRato
var tempo_imunidade

var spawnInimigo
var xInimigo

var proximoCiclo
var eDia
var tempo_gravidade

var ultimoComando 
var percaEnergia
var resistenciaAr

var saveTime

function generateEntre(min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
}

const iniciarJogo = () => {
  ElemNivel.setAttribute("value", localStorage.getItem('nivel'))
  ElemExp.setAttribute("value", localStorage.getItem('exp'))
  ElemExp.setAttribute("value-max", 500)

  ElemVida.setAttribute("value", 155)
  ElemVida.setAttribute("value-max", 155)

  ElemStam.setAttribute("value", 305)
  ElemStam.setAttribute("value-max", 305)

  contador = 0
  spawnRato = generateEntre(821, 1072)
  tempoExpPassivo = spawnRato - 200

  regenStam = 0
  regenVida = 0

  tempoMinRato = 500
  tempo_imunidade = 0

  proximoCiclo = 12000
  eDia = "Dia"

  ultimoComando = 0
  saveTime = 18000

  xInimigo = generateEntre(5, visualViewport.height - 5)
  spawnInimigo = generateEntre(1214, 1897)
  Player.classList.add('animacao')
  arvoreOBS.classList.add('animacao')

  Inimigo.style.left = "100vw"
  Player.style.left = "52px"
  Player.style.bottom = "40vh"

  document.querySelector(".BoxInfoDeath").style.display = "none"
}

const conferirEstamania = (StamNecessario) => {
  Stam = ElemStam.getAttribute("value")
  if (StamNecessario < Stam) {
    ElemStam.setAttribute("value", parseInt(Stam) - StamNecessario)
    return true
  } else {
    ElemStam.classList.add("Insuficiente")
    setTimeout(() => { ElemStam.classList.remove("Insuficiente")}, 3000)
    return false
  }
}

const jump = (Stam, maximo = 5, velocidade = 10) => {
  if (conferirEstamania(Stam)) {
    Player.style.transform = "rotate(-45deg)"
    var contador = 0

    const subir = setInterval(() => {
      contador += 1

      const avePosition = +window.getComputedStyle(Player).bottom.replace("px", "")
      Player.style.bottom = `${avePosition + velocidade}px`

      if (contador == maximo) {
        clearInterval(subir)
        Player.style.transform = "rotate(0deg)"
      }
    }, 100)
  }
}

const descer = (Stam) => {
  if (conferirEstamania(Stam)) {
    var avePosition = +window.getComputedStyle(Player).bottom.replace("px", "")
    if (avePosition > 50) {
      Player.style.transform = "rotate(-300deg)"
      const valor_inicial = +window.getComputedStyle(Player).bottom.replace("px", "")

      const descer = setInterval(() => {
        avePosition = +window.getComputedStyle(Player).bottom.replace("px", "")
        Player.style.bottom = `${avePosition - 10}px`

        if (avePosition < (valor_inicial - 80)) {
          clearInterval(descer)
          Player.style.transform = "rotate(0deg)"
        }
      }, 50)
    }
  }
}

const descida = (Stam, maximo = 5, velocidade = 10) => {
  if (conferirEstamania(Stam)) {
    Player.style.transform = "rotate(-45deg)"
    var contador = 0

    const subir = setInterval(() => {
      contador += 1

      const avePosition = +window.getComputedStyle(Player).bottom.replace("px", "")
      Player.style.bottom = `${avePosition + velocidade}px`

      if (contador == maximo) {
        clearInterval(subir)
        Player.style.transform = "rotate(0deg)"
      }
    }, 100)
  }
}

const ataque = (Stam, Cacador = Player, Presa = ratoPRESA, direcao = "left") => {
  if (Cacador == Player){
    if (!conferirEstamania(Stam)){return}
  }

  var PresaX
  var PresaY 
  var PresaYInicial = +window.getComputedStyle(Presa).top.replace("px", "")
  var WidthPresa

  var CacadorX
  var CacadorY

  var BottomCacador
  var HeightCacador
  var WidthCacador

  Cacador.classList.remove("animacao")
  Cacador.style.backgroundImage = "url('../../images/falcao3_Foda.png')";

  const investida = setInterval(() => {
    PresaX = +window.getComputedStyle(Presa).left.replace("px", "")
    PresaY = +window.getComputedStyle(Presa).top.replace("px", "")
    WidthPresa = +window.getComputedStyle(Presa).width.replace("px", "")

    CacadorX = +window.getComputedStyle(Cacador).left.replace("px", "")
    CacadorY = +window.getComputedStyle(Cacador).top.replace("px", "")
    BottomCacador = +window.getComputedStyle(Cacador).bottom.replace("px", "")
    HeightCacador = +window.getComputedStyle(Cacador).height.replace("px", "")
    WidthCacador =  +window.getComputedStyle(Cacador).width.replace("px", "")

    if (CacadorY <= PresaY && PresaY <= (CacadorY + HeightCacador + 5) &&
        CacadorX >= (PresaX - 5) && (PresaX + WidthPresa) <= (CacadorX + WidthCacador)) {

      Vida = parseInt(ElemVida.getAttribute("value"))
      Exp = parseInt(ElemExp.getAttribute("value"))

      if (Presa == ratoPRESA) {
        spawnRato = parseInt((contador + (892 * (Nivel + 1))) + ((porcentVida * 5) + tempoMinRato))
        Presa.classList.remove("animacao")

        ElemVida.setAttribute("value", Vida + Math.floor(9, 12))
        ElemExp.setAttribute("value", Exp + Math.floor(10, 15))
      }

      if (Presa == Player && contador > tempo_imunidade) {
        tempoExpPassivo += 250
        tempo_imunidade = contador + 200
        ElemVida.setAttribute("value", Vida - Math.floor(15 * (Nivel + 1), 35 * (Nivel + 1)))
      }

      porcentVida = (Vida * 100) / maxVida
      ElemVida.style.width = `${porcentVida}%`
    }

    if (direcao == "left") { CacadorX += 1
    } else if (direcao == "right") { CacadorX -= 1 }
    Cacador.style.left = `${CacadorX}px`

    if (CacadorY > PresaYInicial) { Cacador.style.bottom = `${BottomCacador + 1}px`
    } else { Cacador.style.bottom = `${BottomCacador - 1}px` }

    if (CacadorY >= PresaYInicial || CacadorY >= visualViewport.height - ((visualViewport.height * 25) / 100))  {
      Cacador.classList.add("animacao")

      if (Cacador == Player) {
        clearInterval(investida)
        jump(10, 10, 20)
      }
    }

    // Cancelando o ataque
    if (CacadorX <= -50 || CacadorX >= (visualViewport.width + 100)) {
      clearInterval(investida)
      
      spawnInimigo = parseInt((contador + 872 + (12 * porcentVida)) - ((Nivel * 12)))
      xInimigo = generateEntre(10, visualViewport.height - 10)
      Inimigo.classList.remove("animacao")
      Cacador.style.left = "-500px"
    }
  }, 2)
}

const dash = (Stam, Alvo = Player, direcao = "left", max = 45, velocidade = 32) => {
  if (Player == Player){
    if (!conferirEstamania(Stam)){return}
  }

  var AlvoX
  var contador = 0

  Alvo.classList.remove("animacao")

  const animacao = setInterval(() => {
    contador += (max / velocidade) + 0.2
    AlvoX = +window.getComputedStyle(Alvo).left.replace("px", "")

    if (direcao == "left") { AlvoX += max - contador
    } else if (direcao == "right") { AlvoX -= max - contador }
    Alvo.style.left = `${AlvoX}px`

    if (max - contador <= 0 || AlvoX >= visualViewport.width - 20){  
      Alvo.classList.add("animacao")
      clearInterval(animacao)
    }
  }, velocidade)
}

const salvar = () => {
  document.getElementById("Save").style.display = "flex"
  localStorage.setItem("exp", Exp);
  localStorage.setItem("nivel", Nivel);

  setTimeout(() => {
    document.getElementById("Save").style.display = "none"
  }, 12000)
}

document.addEventListener("keydown", (e) => {
  const keyName = event.key
  Nivel = parseInt(ElemNivel.getAttribute("value")) + 1

  if (contador > (ultimoComando + 70)){
    if (keyName == "w") {
      jump(18 * (Nivel + 1))
    } else if (keyName == "d") {
      descida(13 * (Nivel + 1))
    } else if (keyName == "s") {
      descer(8 * (Nivel + 1))
    } else if (keyName == "a") {
      ataque(26 * (Nivel + 1))
    } else if (keyName == "q") {
      dash(32 * (Nivel + 1))
    } else if (keyName == "p") {
      alert("! PAUSADO !")
    }
    ultimoComando = contador
  }
})

document.getElementById("HomePag").onclick = () => {
  window.location = "../index.html"
}

document.getElementById("ReturnGame").onclick = () => {
  iniciarJogo()
}

iniciarJogo()

// Contador = 1000 -> 10s
// 1s -> 100

const jogo = setInterval(() => {
  // Aumento no Contador / Temporizador do jogo
  contador += 1

  // Variaveis de posicoes para realizar os testes de colisoes
  const PlayerX = Player.getBoundingClientRect().x
  const PlayerY = Player.getBoundingClientRect().y

  const ArvoreX = arvoreOBS.getBoundingClientRect().x
  const ArvoreY = arvoreOBS.getBoundingClientRect().y

  const ArvoreLargura = arvoreOBS.getBoundingClientRect().width
  const ArvoreAltura = arvoreOBS.getBoundingClientRect().height
  const AveAltura = Player.getBoundingClientRect().height

  // Pegando os valores dos atributos "Normais"
  Nivel = parseInt(ElemNivel.getAttribute("value"))
  Exp = parseInt(ElemExp.getAttribute("value"))
  Stam = parseInt(ElemStam.getAttribute("value"))
  Vida = parseInt(ElemVida.getAttribute("value"))

  // Pegando os valores dos atributos "Maximos"
  maxExp = parseInt(ElemExp.getAttribute("value-max"))
  maxStam = parseInt(ElemStam.getAttribute("value-max"))
  maxVida = parseInt(ElemVida.getAttribute("value-max"))

  // Aumentando / Definindo os Limites Maximo
  ElemStam.setAttribute("value-max", 200 + 85 * (Nivel + 1))
  ElemVida.setAttribute("value-max", 100 + 55 * (Nivel + 1))

  // Atribuindo / Definindo os Valores para os atributos
  ElemNivel.setAttribute("value", (maxExp / 500) - 1)
  ElemStam.setAttribute("value", Stam)

  // Passando para os textos os valores dos atributos
  TextAtualExp.innerText = Exp
  TextMaxExp.innerText = maxExp
  TextNivel.innerText = Nivel

  // Porcentagens dos valores
  porcentVida = (Vida * 100) / maxVida
  porcentStam = (Stam * 100) / maxStam
  porcentExp = (Exp * 100) / maxExp

  // Efeitos Visuais
  ElemStam.style.width = `${porcentStam}%`
  ElemVida.style.width = `${porcentVida}%`
  ElemExp.style.background = `linear-gradient(to right,rgb(37, 255, 18) -${100 - porcentExp}%,rgba(13, 106, 4, 0.867) ${0 + porcentExp}%)`

  // Mudança de horario / clima
  if (contador > proximoCiclo) {
    eDia = !eDia
  }

  // Ajuste no baground / clima

  resistenciaAr = 0.8 * (Nivel + 1)
  // Gravidade e Resistencia do Ar
  if (PlayerX > (visualViewport.width / 2)){
    Player.style.left = `${PlayerX - resistenciaAr}px`
  }

  // Assegurando Limites
  if (Vida > maxVida) {
    ElemVida.setAttribute("value", maxVida)
  }

  if (Stam > maxStam) {
    ElemStam.setAttribute("value", maxStam)
  }

  // Passagem de Nivel
  if (Exp >= maxExp) {
    ElemExp.setAttribute("value-max", maxExp + 500)
    ElemStam.setAttribute("value", Stam + 85)
    ElemVida.setAttribute("value", Vida + 55)
  }

  // Regen - Estamania
  if (Stam < maxStam) {
    if (contador > regenStam) {
      ElemStam.setAttribute("value", Stam + (Nivel * 2) + 1)
      regenStam = (contador + (956 * (Nivel + 1))) - ((porcentVida * 5) + 427)
    }
  }

  // Aumento - Experiencia
  if (contador > tempoExpPassivo) {
    ElemExp.setAttribute("value", Exp + 1)
    tempoExpPassivo = (contador + (752 * (Nivel + 1))) - ((porcentVida * 5) + 127)
  }

  // Regen - Vida
  if (Nivel < 6) {
    if (Vida < maxVida) {
      if (contador > regenVida) {
        ElemVida.setAttribute("value", Vida + 1)
        regenVida = contador + porcentVida + (320 * (Nivel + 1))
      }
    }
  }

  // Spawn Rato
  if (contador == spawnRato && Vida > 0) {
    ratoPRESA.classList.add("animacao")
  }

  // Spawn Inimigo
  if (contador == spawnInimigo && Vida > 0) {
    Inimigo.classList.add("animacao")
    Inimigo.style.bottom = `${xInimigo}px`

    if (generateEntre(0,100) >= 50){ 
      Inimigo.style.left = "100vw"
      Inimigo.classList.add("transformado")
      ataque(0, Inimigo, Player, "right")
    } else { 
      Inimigo.classList.remove("transformado")
      Inimigo.style.left = "-50px"
      ataque(0, Inimigo, Player)
    }
  }

  // Save
  if (contador > saveTime){
    salvar()
    save = contador + 18000
  }

  // Removendo o Rato e gerando um novo tempo - Rato passando da tela
  if (ratoPRESA.offsetLeft >= parseInt(visualViewport.width)) {
    spawnRato = parseInt((contador + (678 * (Nivel + 1))) + ((porcentVida * 5) + tempoMinRato))
    ratoPRESA.classList.remove("animacao")
  }
  
  // Diminuição na Vida - Houve Colisão com o obstaculo
  if (contador > tempo_imunidade) {
    if (PlayerX >= ArvoreX && PlayerX <= (ArvoreX + ArvoreLargura) &&
      (PlayerY + AveAltura) >= ArvoreY) {
      ElemVida.setAttribute("value", Vida - Math.floor(7, 15))
      porcentVida = (Vida * 100) / maxVida
      ElemStam.style.width = `${porcentStam}%`

      tempoExpPassivo += 500
      tempo_imunidade = contador + 300
    }
  }

  // Conferindo se não possui mais vida / se perdeu
  if (Vida <= 0 && !Player.classList.contains("1m0rt4l")) {
    Player.style.bottom = `${ArvoreAltura + 60}px`
    ElemVida.setAttribute("value", 1)
    
    Player.style.backgroundImage = "url('../../images/falcao_Foda.png')";
    Player.classList.remove('animacao')
    arvoreOBS.classList.remove('animacao')
    ratoPRESA.classList.remove('animacao')
    Inimigo.classList.remove('animacao')
    salvar()

    alert(" ! Você Perdeu ! \n Tente Novamente")
    document.querySelector(".BoxInfoDeath").style.display = "flex"
  }
}, 7)



