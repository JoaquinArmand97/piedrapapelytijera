let jugador = 0;
let jugadorPc = 0;
let jugadas = ["Piedra", "Papel", "Tijera"];
let inicioMatch = 0;
let victoriasJugador = 0;
let victoriasPc = 0;

console.log("Bienvenidos a Piedra, Papel o Tijera");

function inicioJuego() {
    let jugadaDelJugador = prompt("Elige una: " + jugadas.join(", ")).toLowerCase();
   
    let jugadasMin = jugadas.map(jugada => jugada.toLowerCase());

    if (!jugadasMin.includes(jugadaDelJugador)) {
        console.log("Entrada no válida. Por favor elige Piedra, Papel o Tijera.");
        return;
    }

    jugador = jugadas[jugadasMin.indexOf(jugadaDelJugador)]; 

    let indiceAleatorio = Math.floor(Math.random() * jugadas.length);
    jugadorPc = jugadas[indiceAleatorio];

    console.log("El jugador ha elegido: " + jugador);
    console.log("La computadora ha elegido: " + jugadorPc);

    let resultado = ganador(jugador, jugadorPc); 
    sumarVictorias(resultado); 
}

function ganador(jugador, jugadorPc) {
    if (jugador === jugadorPc) {
        console.log("¡Empate!");
        return "¡Empate!";
    } else if (
        (jugador === "Piedra" && jugadorPc === "Tijera") ||
        (jugador === "Papel" && jugadorPc === "Piedra") ||
        (jugador === "Tijera" && jugadorPc === "Papel")
    ) {
        console.log("¡Ganaste!");
        return "¡Ganaste!";
    } else {
        console.log("¡Perdiste!");
        return "¡Perdiste!";
    }
}

function sumarVictorias(resultado) {
    if (resultado === "¡Ganaste!") {
        victoriasJugador++;
    } else if (resultado === "¡Perdiste!") {
        victoriasPc++;
    }

    console.log("Victorias del jugador: " + victoriasJugador);
    console.log("Victorias de la computadora: " + victoriasPc);
}


while (victoriasJugador < 5 && victoriasPc < 5) {
    inicioJuego();
}

if (victoriasJugador === 5) {
    console.log("¡Felicidades! Has ganado la partida.");
} else if (victoriasPc === 5) {
    console.log("La computadora ha ganado la partida. ¡Mejor suerte la próxima vez!");
}

console.log("Fin del juego. Gracias por jugar!");
