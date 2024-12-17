
function fazerCampo(quantasLinhasY, quantasLinhasX){
resetCampo()
let x = quantasLinhasX + 101
let idLinha = 100

let row = []

for (let i = 101; i < x; i++) {
    row.push(i)
}

let arreyNaoTem = []
for (i = -101; i < 100; i++){
    arreyNaoTem.push(i)
}
for (i = 1; i < quantasLinhasY +1; i++){
    arreyNaoTem.push(i * 100)

    let e = quantasLinhasX + 1
    arreyNaoTem.push(e + (i * 100))
}
for(i = quantasLinhasY * 100 + 100; i < quantasLinhasY * 100 + 200; i++){
    arreyNaoTem.push(i)
}
let campo = [row]

for(let i = 1; i < quantasLinhasY + 1; i++) {
    idLinha = idLinha * i

    campo.forEach((row) => {
        let novaLinha = document.createElement("div")

        novaLinha.classList.add("row")
        novaLinha.setAttribute("idColuna", i)
        
        row.forEach((item) => {
            idLinha += 1
            let v = 0

            let clone = document.querySelector(".quadrado").cloneNode(true)

            clone.classList.remove("base")
            clone.setAttribute("id" , idLinha)
            clone.setAttribute("value", numeroAleatorio())
            novaLinha.appendChild(clone) 
        })
        document.querySelector(".campo").appendChild(novaLinha)
        idLinha = 100
    })
}

// let divToRemove = document.getElementById("00");
// divToRemove.remove();

function numeroAleatorio(){
    numAleatorio = Math.floor(Math.random() * (5))
    return numAleatorio
}
function SomaRedor(idLinha) {
    let idLinhaNum = parseInt(idLinha)
    let ct = idLinhaNum - 101
    let c = idLinhaNum - 100
    let cp = idLinhaNum - 99
    let t = idLinhaNum - 1
    let p = idLinhaNum + 1
    let bt = idLinhaNum + 99
    let b = idLinhaNum + 100
    let bp = idLinhaNum + 101
    
    let somaArreyIdLinha = [ct, c, cp, t, p, bt, b, bp];
    return somaArreyIdLinha
}
let quadrados = document.querySelectorAll(".quadrado");

quadrados.forEach(function(quadrado) {
    quadrado.addEventListener("click", function andar() {
        let v = 0
        
        let idLinha = quadrado.getAttribute("id")
        let IdsArreySoma = SomaRedor(idLinha)
        
        IdsArreySoma.forEach((item => {
            if (!arreyNaoTem.includes(item)){
                
                let valorValue = document.getElementById(item).getAttribute("value")
                if (valorValue == 0){
                    v += 1;
                }
            }
        }))
        
        let proprioValue = parseInt(document.getElementById(idLinha).getAttribute("value"))
        if (proprioValue === 0) {
            pausado = true
            document.getElementById(idLinha).style.backgroundColor = "gray"
            document.getElementById(idLinha).innerHTML = `<img src="assets/img/bomb.png">`
            
        } else {
            document.getElementById(idLinha).style.backgroundColor = "green"
        }
        
        quadrado.querySelector('h1').textContent = v;
        
    });
});

quadrados.forEach((quadrado)=>{
    quadrado.addEventListener("contextmenu", (e)=>{
        e.preventDefault()
        let idLinha = quadrado.getAttribute("id")
        document.getElementById(idLinha).innerHTML = '<img src="assets/img/bandeira.png">'
        quadrado.getElementById(idLinha).removeEventListener("click", andar)
    })
})

}

function resetCampo() {
    document.querySelector(".campo").innerHTML = "";
    arreyNaoTem = [];
}

//      TEMPO       //
let mmEl = document.querySelector("#minutos")
let ssEl = document.querySelector("#segundos")
let msEl = document.querySelector("#milisegundos")
let btnStart = document.querySelector("#start")
let btnReset = document.querySelector("#reset")
let mm = 0
let ss = 0
let ms = 0
let pausado = false
let intervalo

function startTempo(){
    intervalo = setInterval(()=>{
        if(!pausado){
            ms+= 10

            if(ms === 1000){
                ms = 0
                ss++

                if(ss === 60) {
                    ss = 0
                    mm++
                }
            }

            mmEl.textContent = formatoTempo(mm)
            ssEl.textContent = formatoTempo(ss)
            msEl.textContent = formatoMS(ms)
        }
    }, 20)
}

function zerarTempo() {
    mm = 0
    ss = 0
    ms = 0
    mmEl.textContent = "00"
    ssEl.textContent = "00"
    msEl.textContent = "000"
}
function formatoTempo (tempo){
    return tempo < 10 ? `0${tempo}` : tempo
}
function formatoMS (tempo){
    return tempo < 100 ? `${tempo}`.padStart(3, "0") : tempo
}

fazerCampo(15, 15)

let form = document.querySelector("#form")
let linhasX = document.getElementById("linhasX")
let linhasY = document.getElementById("linhasY")
let campoLinhaX
let campoLinhaY

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    zerarTempo()

    campoLinhaX = linhasX.value
    campoLinhaY = linhasY.value
    
    if(campoLinhaX != "" && campoLinhaY != ""){
        if(campoLinhaX != "0" && campoLinhaY != "0"){
            fazerCampo(parseInt(campoLinhaY), parseInt(campoLinhaX))
        } else {
            fazerCampo(2, 2)
        }
    } else {
        fazerCampo(15, 15)
        startTempo()
    }
})

let btnResetCampo = document.getElementById("btn-recomecar")
btnResetCampo.addEventListener("click", ()=>{
    
}) 
let cronometro = document.querySelector("#btn-iniciar")
cronometro.addEventListener("click", (e)=>{
    startTempo()
    if(pausado == false){
        pausado = true
    } else {
        pausado = false
    }
})