
var musicaAmbiente = new Audio("res/musica_fondo.mp3");
musicaAmbiente.loop = true;

var efectos = {
    disparo : "res/musica_power_up.mp3",
    explosion : "res/efecto_explosion.mp3",
    espada : "res/musica_espada.mp3"
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}