document.addEventListener('DOMContentLoaded', function() {
    const juego = new Juego();
    const jugarBtn = document.getElementById('jugarBtn');
    const jugarBtn2 = document.getElementById('jugarBtn2');
    const nombreInput = document.getElementById('nombreInput');
    const jugarBtn3 = document.getElementById('jugarBtn3');
    const nombreJugador = document.getElementById('nombreJugador');

    mostrarUltimosJugadores();

    jugarBtn.addEventListener('click', function() {
        nombreInput.classList.remove('hidden');
        jugarBtn.style.display = 'none';
    });

    jugarBtn3.addEventListener('click', function() {
        const nombre = nombreJugador.value.trim();
        if (nombre) {
            juego.setNombreJugador(nombre);
            nombreInput.classList.add('hidden');
            document.querySelector('.imagenes').classList.remove('escondido');
            juego.inicioJuego();
            guardarJugador(nombre);
        } else {
            alert("Por favor, ingresa un nombre.");
        }
    });

    jugarBtn2.addEventListener('click', function() {
        jugarBtn2.classList.add('escondido');
        document.querySelector('.imagenes').classList.remove('escondido');
        const mensajeFinal = document.querySelector('.mensajeFinal');
        if (mensajeFinal) {
            mensajeFinal.remove();
        }
        juego.inicioJuego();
    });

    document.getElementById('piedra').addEventListener('click', function() {
        juego.usuarioElige('Piedra');
    });
    document.getElementById('papel').addEventListener('click', function() {
        juego.usuarioElige('Papel');
    });
    document.getElementById('tijera').addEventListener('click', function() {
        juego.usuarioElige('Tijera');
    });

    function guardarJugador(nombre) {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
        jugadores.unshift(nombre);
        if (jugadores.length > 5) {
            jugadores.pop();
        }
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
    }

    function mostrarUltimosJugadores() {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
        const listaJugadores = document.getElementById('listaJugadores');
        listaJugadores.innerHTML = '';
        jugadores.forEach((jugador) => {
            const li = document.createElement('li');
            li.textContent = jugador;
            listaJugadores.appendChild(li);
        });
    }
});

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.victorias = 0;
    }

    incrementarVictorias() {
        this.victorias++;
    }
}

class Juego {
    constructor() {
        this.jugador = new Jugador('');
        this.pc = new Jugador('Computadora');
        this.jugadas = ["Piedra", "Papel", "Tijera"];
        console.log("Bienvenidos a Piedra, Papel o Tijera");
    }

    setNombreJugador(nombre) {
        this.jugador.nombre = nombre;
        document.getElementById('victoriasJugador').innerText = `Victorias de ${nombre} : 0 `;
    }

    inicioJuego() {
        this.jugador.victorias = 0;
        this.pc.victorias = 0;
        this.actualizarVictorias();
        document.querySelector('.imagenes').classList.remove('escondido');
        document.getElementById('jugarBtn2').classList.add('escondido');
        const mensajeFinal = document.querySelector('.mensajeFinal');
        if (mensajeFinal) {
            mensajeFinal.remove();
        }
    }

    usuarioElige(eleccion) {
        let pcEleccion = this.pcJuega();
        console.log(`${this.jugador.nombre} ha seleccionado: ${eleccion}`);
        console.log(`La computadora ha seleccionado: ${pcEleccion}`);
        this.mostrarJugadas(eleccion, pcEleccion);

        let resultado = this.ganador(eleccion, pcEleccion);
        if (resultado === "¡Ganaste!") {
            this.jugador.incrementarVictorias();
        } else if (resultado === "¡Perdiste!") {
            this.pc.incrementarVictorias();
        }
        this.actualizarVictorias();

        if (this.jugador.victorias === 5) {
            this.mostrarMensajeFinal(`¡Felicidades, ${this.jugador.nombre}! Has ganado la partida.`);
            this.finalizarJuego();
        } else if (this.pc.victorias === 5) {
            this.mostrarMensajeFinal("La computadora ha ganado la partida. ¡Mejor suerte la próxima vez!");
            this.finalizarJuego();
        }
    }

    pcJuega() {
        let indiceAleatorio = Math.floor(Math.random() * this.jugadas.length);
        return this.jugadas[indiceAleatorio];
    }

    ganador(jugador, pc) {
        if (jugador === pc) {
            console.log("¡Empate!");
            return "¡Empate!";
        } else if (
            (jugador === "Piedra" && pc === "Tijera") ||
            (jugador === "Papel" && pc === "Piedra") ||
            (jugador === "Tijera" && pc === "Papel")
        ) {
            console.log("¡Ganaste!");
            return "¡Ganaste!";
        } else {
            console.log("¡Perdiste!");
            return "¡Perdiste!";
        }
    }

    mostrarJugadas(jugador, pc) {
        document.getElementById('jugadas').classList.remove('hidden');
        document.getElementById('jugadaJugador').innerText = `El jugador ha elegido: ${jugador} `;
        document.getElementById('jugadaComputadora').innerText = ` La computadora ha elegido: ${pc}`;
    }

    actualizarVictorias() {
        document.getElementById('resultados').style.display = 'flex';
        document.getElementById('victoriasJugador').innerText = `Victorias de ${this.jugador.nombre}: ${this.jugador.victorias}`;
        document.getElementById('victoriasComputadora').innerText = ` Victorias de la computadora: ${this.pc.victorias}`;
    }

    mostrarMensajeFinal(mensaje) {
        const mensajeFinal = document.createElement('div');
        mensajeFinal.className = 'mensajeFinal';
        mensajeFinal.innerHTML = `<h1>${mensaje}</h1>`;
        const jugarBtn2 = document.getElementById('jugarBtn2');
        document.body.insertBefore(mensajeFinal, jugarBtn2);
    }

    finalizarJuego() {
        document.querySelector('.imagenes').classList.add('escondido');
        document.getElementById('jugarBtn2').classList.remove('escondido');
        document.getElementById('jugarBtn2').style.display = 'block';
    }
}