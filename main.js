document.addEventListener('DOMContentLoaded', function() {
    const juego = new Juego();
    document.getElementById('jugarBtn').addEventListener('click', function() {
        document.querySelector('.hidden').classList.add('inicio');
        document.querySelector('.hidden').classList.remove('hidden');
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
        this.jugador = new Jugador('Jugador');
        this.pc = new Jugador('Computadora');
        this.jugadas = ["Piedra", "Papel", "Tijera"];
        console.log("Bienvenidos a Piedra, Papel o Tijera");
    }

    inicioJuego() {
        this.jugador.victorias = 0;
        this.pc.victorias = 0;

        while (this.jugador.victorias < 5 && this.pc.victorias < 5) {
            let jugadaDelJugador = prompt("Elige una: " + this.jugadas.join(", ")).toLowerCase();
            let jugadasMin = this.jugadas.map(jugada => jugada.toLowerCase());

            if (!jugadasMin.includes(jugadaDelJugador)) {
                console.log("Entrada no válida. Por favor elige Piedra, Papel o Tijera.");
                continue;
            }

            let jugadorEleccion = this.jugadas[jugadasMin.indexOf(jugadaDelJugador)]; 
            let indiceAleatorio = Math.floor(Math.random() * this.jugadas.length);
            let pcEleccion = this.jugadas[indiceAleatorio];

            console.log("El jugador ha elegido: " + jugadorEleccion);
            console.log("La computadora ha elegido: " + pcEleccion);

            let resultado = this.ganador(jugadorEleccion, pcEleccion); 

            if (resultado === "¡Ganaste!") {
                this.jugador.incrementarVictorias();
            } else if (resultado === "¡Perdiste!") {
                this.pc.incrementarVictorias();
            }

            console.log("Victorias del jugador: " + this.jugador.victorias);
            console.log("Victorias de la computadora: " + this.pc.victorias);
        }

        if (this.jugador.victorias === 5) {
            console.log("¡Felicidades! Has ganado la partida.");
        } else if (this.pc.victorias === 5) {
            console.log("La computadora ha ganado la partida. ¡Mejor suerte la próxima vez!");
        }

        console.log("Fin del juego. Gracias por jugar!");
    }

    usuarioElige(eleccion) {
        let resultado = this.ganador(eleccion, this.pcJuega());
        if (resultado === "¡Ganaste!") {
            this.jugador.incrementarVictorias();
        } else if (resultado === "¡Perdiste!") {
            this.pc.incrementarVictorias();
        }
        console.log("Victorias del jugador: " + this.jugador.victorias);
        console.log("Victorias de la computadora: " + this.pc.victorias);

        if (this.jugador.victorias === 5) {
            console.log("¡Felicidades! Has ganado la partida.");
        } else if (this.pc.victorias === 5) {
            console.log("La computadora ha ganado la partida. ¡Mejor suerte la próxima vez!");
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
}
