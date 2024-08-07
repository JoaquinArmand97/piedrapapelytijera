document.addEventListener('DOMContentLoaded', function() {
    const juego = new Juego();

    const jugarBtn = document.getElementById('jugarBtn');
    const nombreInput = document.getElementById('nombreInput');
    const jugarBtn3 = document.getElementById('jugarBtn3');
    const nombreJugador = document.getElementById('nombreJugador');
    const buttonClave = document.getElementById('jugarBtn5');
    const inputClave = document.getElementById('inputClave');
    const copiarBtn = document.getElementById('copiarBtn');
    const imagenes = document.querySelector('.imagenes');
    const resultados = document.getElementById('resultados');

    const horaArgentinaDiv = document.getElementById('horaArgentina');

    async function obtenerHoraArgentina() {
        try {
            const response = await fetch('https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires');
            const data = await response.json();
            const dateTime = new Date(data.datetime);
            horaArgentinaDiv.innerText = `Hora en Argentina: ${dateTime.toLocaleTimeString()}`;
        } catch (error) {
            horaArgentinaDiv.innerText = 'Error al obtener la hora de Argentina.';
            console.error('Error fetching Argentina time:', error);
        }
    }

    obtenerHoraArgentina();

    let generar = (largo) => {
        let data = "SKFJKskjslk%#@#$%^&*2342134KJFSA";
        data = data.split('');
        let clave = '';
        for (let i = 0; i < largo; i++) {
            let claveAleatorio = Math.floor(Math.random() * data.length);
            clave += data[claveAleatorio];
        }
        return clave;
    };

    let miClave = '';

    buttonClave.addEventListener('click', function() {
        miClave = generar(10);
        inputClave.value = miClave;
    });

    copiarBtn.addEventListener('click', function() {
        inputClave.select();
        document.execCommand('copy');
        alert('Cupón copiado: ' + inputClave.value);
    });

    jugarBtn.addEventListener('click', function() {
        nombreInput.classList.remove('hidden');
        jugarBtn.classList.add('hidden');
    });

    jugarBtn3.addEventListener('click', async function() {
        const nombre = nombreJugador.value.trim();
        if (nombre) {
            const { value: miClaveUsuario } = await Swal.fire({
                title: "Ingresa Cupon de regalo",
                input: "password",
                inputLabel: "Ingresar Cupon",
                inputPlaceholder: "Ingresa cupon de regalo",
                inputAttributes: {
                    maxlength: "10",
                    autocapitalize: "off",
                    autocorrect: "off"
                }
            });

            if (miClaveUsuario && miClaveUsuario === miClave) {
                Swal.fire(`Ingresaste con el cupon de regalo ${miClaveUsuario}`);
                juego.setNombreJugador(nombre);
                nombreInput.classList.add('hidden');
                imagenes.classList.remove('hidden');
                resultados.classList.remove('hidden');
                juego.inicioJuego();
                guardarJugador(nombre);
            } else {
                Swal.fire("Cupon no valido");
            }
        } else {
            alert("Por favor, ingresa un nombre.");
        }
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

    document.getElementById('jugarBtn2').addEventListener('click', function() {
        juego.inicioJuego();
    });

    function guardarJugador(nombre) {
        let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];
        jugadores.unshift(nombre);
        if (jugadores.length > 5) {
            jugadores.pop();
        }
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
        mostrarUltimosJugadores();
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

    mostrarUltimosJugadores();
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
        document.getElementById('victoriasJugador').innerText = `Victorias de ${nombre}: 0`;
    }

    inicioJuego() {
        this.jugador.victorias = 0;
        this.pc.victorias = 0;
        this.actualizarVictorias();
        document.querySelector('.imagenes').classList.remove('hidden');
        document.getElementById('jugarBtn').classList.add('hidden');
        document.getElementById('jugarBtn2').classList.add('hidden');
        document.querySelectorAll('.mensajeFinal').forEach(el => el.remove());
    }

    usuarioElige(eleccion) {
        let pcEleccion = this.pcJuega();
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
            return "¡Empate!";
        } else if (
            (jugador === "Piedra" && pc === "Tijera") ||
            (jugador === "Papel" && pc === "Piedra") ||
            (jugador === "Tijera" && pc === "Papel")
        ) {
            return "¡Ganaste!";
        } else {
            return "¡Perdiste!";
        }
    }

    mostrarJugadas(jugador, pc) {
        document.getElementById('jugadas').classList.remove('hidden');
        document.getElementById('jugadaJugador').innerText = `El jugador ha elegido: ${jugador}`;
        document.getElementById('jugadaComputadora').innerText = `La computadora ha elegido: ${pc}`;
    }

    actualizarVictorias() {
        document.getElementById('resultados').style.display = 'flex';
        document.getElementById('victoriasJugador').innerText = `Victorias de ${this.jugador.nombre}: ${this.jugador.victorias}`;
        document.getElementById('victoriasComputadora').innerText = `Victorias de la computadora: ${this.pc.victorias}`;
    }

    mostrarMensajeFinal(mensaje) {
        const mensajeFinal = document.createElement('div');
        mensajeFinal.className = 'mensajeFinal';
        mensajeFinal.innerHTML = `<h1>${mensaje}</h1>`;
        const jugarBtn2 = document.getElementById('jugarBtn2');
        document.body.insertBefore(mensajeFinal, jugarBtn2);
    }

    finalizarJuego() {
        document.querySelector('.imagenes').classList.add('hidden');
        document.getElementById('jugarBtn2').classList.remove('hidden');
        document.getElementById('jugarBtn2').style.display = 'block';
    }
}
