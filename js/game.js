//pegando tamanha do display
let altura = innerHeight
let largura = innerWidth
let life = 1
let temp = 10
let vel = 0

//pegando os parâmetros do url para estabelar o nível
let nivel = location.search
nivel = nivel.replace('?', '')

if(nivel === 'dificil') {
    temp = 20
    vel = 1100
} else if(nivel === 'expert') {
    temp = 20
    vel = 1000
} else {
    temp = 15
    vel = 1200
}

function display() {
    altura = innerHeight
    largura = innerWidth
}

//função para adicionar classes especificas
function sizeImg() {
    let size = Math.floor(Math.random() * 3)
    
    switch(size) {
        case 0: 
            return 'mosquito1'
        case 1: 
            return 'mosquito2'
        case 2: 
            return 'mosquito3'
    }
}

let setTemp = setInterval(() => {
    const Countdown = document.querySelector('#temp')
    
    Countdown.innerHTML = `00:${temp}`
    temp -= 1
    
    if(temp < 0) {
        location.href = 'win.html'
    }

}, 1000);

//função que criará o elemento e o mostrarar na tela
function positions() {

    const idMosquito = document.querySelector('#mosquito')
    
    //apagando elemento caso exista um
    if(idMosquito) {
        idMosquito.remove()

        //redirecionando para pagina game over
        if(life > 3) {
            location.href = 'gameOver.html'
        } else {
            //trocando img das vidas
            document.querySelector(`#life${life}`).src = '../assets/imgs/coracao_vazio.png'
            life++
        }

    }

    //valores randomicos para passar para o elemento que vamos criar
    let positionX = Math.floor(Math.random() * largura) - 105
    let positionY = Math.floor(Math.random() * altura) - 105

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    //criando elemento
    let mosquito = document.createElement('img')
    mosquito.src = '../assets/imgs/mosquito.png'

    mosquito.className = sizeImg()

    //lado do mosquito
    if(positionX > largura / 2 + 50) {
        mosquito.classList.add('rigth')
    }

    //onde irá aparecer
    mosquito.style.left = `${positionX}px`
    mosquito.style.top = `${positionY}px`

    //passamos id para removermos o elemento
    mosquito.id = 'mosquito'

    //matando o mosquito
    mosquito.onclick = () => {
        mosquito.remove()
    }

    const container = document.querySelector('.container')
    container.append(mosquito)
}


setInterval(() => {
    positions()
}, vel)