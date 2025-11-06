// Variables y constantes
const palabras = ['AHORCADO', 'JUEGO', 'PIKACHU', 'LUKE', 'JAVA', 'CLIENTE'];
let palabraSecreta = '';
let palabraMostrada = [];
let intentosRestantes = 6;
let letrasUsadas = [];
let juegoTerminado = false;

// Función para iniciar el juego
// Selecciona una palabra aleatoria y prepara el estado inicial del juego
function iniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraMostrada = [];
    for (let i = 0; i < palabraSecreta.length; i++) {
        palabraMostrada.push('_');
    }
    intentosRestantes = 6;
    letrasUsadas = [];
    juegoTerminado = false;
    actualizarPantalla();
}

// Función para actualizar la pantalla con el estado actual del juego
function actualizarPantalla() {
    document.querySelector('.palabra').textContent = palabraMostrada.join(' ');
    document.querySelector('.intentos').textContent = ' ' + intentosRestantes + ' ';
    document.querySelector('.lista-errores').textContent = letrasUsadas.join(', ');
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

    actualizarPantalla();
    verificarFinJuego();
}

// Función para verificar si el juego ha terminado o no
function verificarFinJuego() {
    if (palabraMostrada.join('') === palabraSecreta) {
        document.querySelector('.mensaje').textContent = '¡Ganaste!';
        document.querySelector('.mensaje').className = 'mensaje ganado';
        juegoTerminado = true;
    } else if (intentosRestantes === 0) {
        document.querySelector('.mensaje').textContent = '¡Perdiste! La palabra era: ' + palabraSecreta;
        document.querySelector('.mensaje').className = 'mensaje perdido';
        juegoTerminado = true;
    }
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