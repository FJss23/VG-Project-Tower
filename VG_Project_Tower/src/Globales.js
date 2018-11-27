var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;


var nivelActual = 0;
var nivelMaximo = 3;

var cuerpo = {};
cuerpo.dinamico = 1;
cuerpo.estatico = 2;

var estados = {};
estados.moviendo= 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.atacandoEspada = 6;
estados.atacandoEspecial = 7;
estados.impactado = 8;
estados.explotando = 9;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;
orientaciones.arriba= 4;
orientaciones.abajo = 5;

