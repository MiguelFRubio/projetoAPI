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

    console.log( objResposta );

    let localidade = objResposta.data[0];

    console.log( localidade.local);
}