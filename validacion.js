const generar = (largo) => {
    let data = "SKFJKskjslk%#@#$%^&*2342134KJFSA";
    data = data.split(''); 
    let clave = ''; 
    for (let i = 0; i < largo; i++) {
        let claveAleatorio = Math.floor(Math.random() * data.length); 
        clave += data[claveAleatorio]; 
    }

    return clave; 
};

const miClave = generar(10); 


let buttonClave = document.getElementById('jugarBtn5');
let inputClave = document.getElementById('inputClave');

buttonClave.addEventListener('click', function() {
    inputClave.value = miClave;
});
