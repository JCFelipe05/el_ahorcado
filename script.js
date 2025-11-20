// Variables
let categorias = [];
let categoriaSeleccionada = null;
let palabras = [];
let palabraSecreta = '';
let palabraMostrada = [];
let intentosRestantes = 6;
let letrasUsadas = [];
let juegoTerminado = false;
let tiempoRestante = 10;
let intervaloTiempo;
let partidasJugadas = 0;
let partidasGanadas = 0;
let partidasPerdidas = 0;

// Bloque para cargar las categorías en el selector
fetch('palabras.json')
    .then(response => response.json())
    .then(data => {
        categorias = data.categorias;
        cargarCategorias();
    })
    .catch(error => {
        console.error('Error al cargar el JSON:', error);
        document.getElementById('categoria').innerHTML = '<option value="">Error al cargar categorías</option>';
    });

// Función para cargar las categorías en el selector
function cargarCategorias() {
    const selectCategoria = document.getElementById('categoria');
    selectCategoria.innerHTML = '<option value="">Selecciona una categoría</option>';
    
    for (let i = 0; i < categorias.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = categorias[i].categoria;
        selectCategoria.appendChild(option);
    }
    
    selectCategoria.addEventListener('change', function() {
        if (this.value !== '') {
            categoriaSeleccionada = parseInt(this.value);
            palabras = categorias[categoriaSeleccionada].palabras;
            iniciarJuego();
        }
    });
}

// Función para iniciar el juego
// Selecciona una palabra aleatoria y prepara el estado inicial del juego
function iniciarJuego() {
    if (palabras.length === 0) {
        console.log('Por favor, selecciona una categoría primero');
        return;
    }

    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    palabraMostrada = [];
    for (let i = 0; i < palabraSecreta.length; i++) {
        palabraMostrada.push('_');
    }
    intentosRestantes = 6;
    letrasUsadas = [];
    juegoTerminado = false;

    tiempoRestante = 10;
    document.getElementById('tiempo').textContent = tiempoRestante;
    clearInterval(intervaloTiempo);
    iniciarTemporizador();

    document.querySelector('.mensaje').textContent = '';
    document.querySelector('.mensaje').className = 'mensaje';

    const todasLetras = document.querySelectorAll('.letra');
    for (let i = 0; i < todasLetras.length; i++) {
        todasLetras[i].classList.remove('usada');
    }

    actualizarPantalla();
}

// Función para actualizar la pantalla con el estado actual del juego
function actualizarPantalla() {
    document.querySelector('.palabra').textContent = palabraMostrada.join(' ');
    document.querySelector('.intentos').textContent = ' ' + intentosRestantes + ' ';
    document.querySelector('.lista-errores').textContent = letrasUsadas.join(', ');
}

function iniciarTemporizador() {
    tiempoRestante = 10;
    document.getElementById('tiempo').textContent = tiempoRestante;
            
    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo').textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            if (!juegoTerminado) {
                juegoTerminado = true;
                document.querySelector('.mensaje').textContent = '¡Se acabó el tiempo! La palabra era: ' + palabraSecreta;
                document.querySelector('.mensaje').className = 'mensaje perdido';
                partidasJugadas++;
                partidasPerdidas++;
                actualizarEstadisticas();
            }
        }
    }, 1000);
}

// Función para verificar la letra ingresada por el jugador
function verificarLetra(letra) {
    if (juegoTerminado) return;
            
    let letraEncontrada = false;
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraMostrada[i] = letra;
            letraEncontrada = true;
        }
    }

    if (!letraEncontrada) {
        intentosRestantes--;
        letrasUsadas.push(letra);
    }

    iniciarTemporizador();
    actualizarPantalla();
    verificarFinJuego();
}

// Función para verificar si el juego ha terminado o no
function verificarFinJuego() {
    let palabraCompleta = true;
    for (let i = 0; i < palabraMostrada.length; i++) {
        if (palabraMostrada[i] === '_') {
            palabraCompleta = false;
            break;
        }
    }

    if (palabraCompleta) {
        clearInterval(intervaloTiempo);
        document.querySelector('.mensaje').textContent = '¡Ganaste!';
        document.querySelector('.mensaje').className = 'mensaje ganado';
        juegoTerminado = true;
        partidasJugadas++;
        partidasGanadas++;
        actualizarEstadisticas();
    } else if (intentosRestantes === 0) {
        clearInterval(intervaloTiempo);
        document.querySelector('.mensaje').textContent = '¡Perdiste! La palabra era: ' + palabraSecreta;
        document.querySelector('.mensaje').className = 'mensaje perdido';
        juegoTerminado = true;
        partidasJugadas++;
        partidasPerdidas++;
        actualizarEstadisticas();
    }
}

// Función para actualizar las estadísticas del juego
function actualizarEstadisticas() {
    document.getElementById('partidasJugadas').textContent = partidasJugadas;
    document.getElementById('partidasGanadas').textContent = partidasGanadas;
    document.getElementById('partidasPerdidas').textContent = partidasPerdidas;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    document.querySelector('.mensaje').textContent = '';
    document.querySelector('.mensaje').className = 'mensaje';
    let letras = document.querySelectorAll('.letra');
    for (let i = 0; i < letras.length; i++) {
        letras[i].classList.remove('usada');
    }
    iniciarJuego();
}

// Configuración de los eventos para las letras
let letras = document.querySelectorAll('.letra');
for (let i = 0; i < letras.length; i++) {
    letras[i].addEventListener('click', function() {
        if (!this.classList.contains('usada') && !juegoTerminado) {
            this.classList.add('usada');
            verificarLetra(this.textContent);
        }
    });
}

iniciarJuego();