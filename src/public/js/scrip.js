const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");
      //js para mostrar la barra de busqueda
        searchToggle.addEventListener("click" , () =>{
        searchToggle.classList.toggle("active");
      });
      //js para mostrar el menu
        sidebarOpen.addEventListener("click" , () =>{
            nav.classList.add("active");
        });

        body.addEventListener("click" , e =>{
            let clickedElm = e.target;

            if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
                nav.classList.remove("active");
            }
        })

function App(){}
    window.onload = function(event){
        var app = new App();
        window.app = app;
    }

    App.prototype.processingButton = function(event) {
        
        const btn = event.currentTarget;
        const carruselList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector('#track');
        const carrusel  = track.querySelectorAll('.contes2');

        const carruselWidth = carrusel[0].offsetWidth;

        const trackWidth = track.offsetWidth;
        const listWidth = carruselList.offsetWidth;

        track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0,-2)* -1);
        btn.dataset.button == "button-prev" ? prevAction(leftPosition,carruselWidth, track) : nextAction(leftPosition,trackWidth, listWidth, carruselWidth, track);
    }

    let prevAction = (leftPosition, carruselWidth, track) => {
        if (leftPosition > 0) {
            track.style.left = `${-1*(leftPosition - carruselWidth)}px`;
        }
    }

    let nextAction = (leftPosition,trackWidth,listWidth, carruselWidth, track) => {
        if (leftPosition < (trackWidth - listWidth)) {
            track.style.left = `${-1*(leftPosition + carruselWidth)}px`;
        }
    }

//Responsive Carrusel
const elementosCarrusel = document.querySelectorAll('.contes2');
let indiceActivo = 0;

function mostrarElementoActivo() {
    elementosCarrusel.forEach((elemento, index) => {
        if (index === indiceActivo) {
            elemento.classList.add('active');
        } else {
            elemento.classList.remove('active');
        }
    });
}

function avanzarElemento() {
    indiceActivo++;
    if (indiceActivo >= elementosCarrusel.length) {
        indiceActivo = 0;
    }
    mostrarElementoActivo();
}

function retrocederElemento() {
    indiceActivo--;
    if (indiceActivo < 0) {
        indiceActivo = elementosCarrusel.length - 1;
    }
    mostrarElementoActivo();
}

document.getElementById('button-next').addEventListener('click', avanzarElemento);
document.getElementById('button-prev').addEventListener('click', retrocederElemento);

mostrarElementoActivo();
