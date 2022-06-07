window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
//var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


// Secção butões

const sectionBtns = document.querySelector(".butoes #localidades")
const sectionPrevisoes = document.querySelector(".previsoes")

let xhr = new XMLHttpRequest();
xhr.open( 'GET', "https://api.ipma.pt/open-data/distrits-islands.json");
xhr.addEventListener('load', processaResposta );
xhr.send();
let startTime = performance.now();

function processaResposta( e ) {

  let endTime = performance.now();
    console.log( 'Chegou a resposta em', endTime - startTime , 'ms');

    let textoRespostaJSON = e.target.responseText;
    let objResposta = JSON.parse( textoRespostaJSON );

    let localidades = objResposta.data;

    for (const localidade of localidades) {

      const btn = document.createElement("button")
      btn.textContent = localidade.local
      btn.setAttribute("data-distrito", localidade.globalIdLocal)

      sectionBtns.appendChild(btn)
      btn.addEventListener("click", mostrarDados)
    }
}

function mostrarDados(e) {
  const target = e.currentTarget
  const idGlobalBtn = target.getAttribute("data-distrito")
  sectionPrevisoes.innerHTML = ""

  fetch(`http://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${idGlobalBtn}.json`)
    .then(res => res.json())
    .then(data => {

      const dados = data.data
      for (const localidade of dados) {
        const div = document.createElement("div")
        const innerDiv = document.createElement("div")
        const tMin = document.createElement("h2")
        const tMax = document.createElement("h2")
        const forecastDate = document.createElement("h2")

        tMin.textContent = localidade.tMin
        tMax.textContent = localidade.tMax
        forecastDate.textContent = localidade.forecastDate

        tMin.classList.add("tMin")
        tMax.classList.add("tMax")
        forecastDate.classList.add("forecastDate")

        div.classList.add("teste")

        sectionPrevisoes.appendChild(div)
        innerDiv.appendChild(tMin)
        innerDiv.appendChild(tMax)
        div.appendChild(forecastDate)
        div.appendChild(innerDiv)
      } 



    })
}

