// Precargado de recursos

// CUIDADO CON EL disparo_jugador
var imagenes = {
    jugador: "res/jugador.png",
    enemigo : "res/enemigo.png",
    aliado : "res/aliado.png",

    enemigo_movimiento : "res/enemigo_movimiento.png",
    disparo_jugador : "res/disparo_jugador2.png",

    hierba:"res/hierba.png",

    ataque_abajo : "res/ataque_abajo.png",
    ataque_arriba : "res/ataque_arriba.png",
    ataque_derecha : "res/ataque_derecha.png",
    ataque_izquierda : "res/ataque_izquierda.png",
    caminar_abajo : "res/caminar_abajo.png",
    caminar_arriba : "res/caminar_arriba.png",
    caminar_derecha : "res/caminar_derecha.png",
    caminar_izquierda : "res/caminar_izquierda.png",
    idle_abajo : "res/idle_abajo.png",
    idle_arriba : "res/idle_arriba.png",
    idle_derecha : "res/idle_derecha.png",
    idle_izquierda : "res/idle_izquierda.png",

    salida_abajo : "res/salida_abajo.png",
    salida_arriba : "res/salida_arriba.png",
    salida_izquierda : "res/salida_izquierda.png",
    salida_derecha : "res/salida_derecha.png",

    muerte_abajo : "res/muerte_abajo.png",
    muerte_arriba : "res/muerte_arriba.png",
    muerte_derecha : "res/muerte_derecha.png",
    muerte_izquierda : "res/muerte_izquierda.png",

    torre: "res/torre.png",

    disparo_enemigo : "res/disparo_enemigo.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vidas : "res/icono_vidas.png",
    enemigo_correr_izquierda : "res/enemigo_correr_izquierda.png",
    enemigo_morir : "res/enemigo_morir.png",
    bloque_tierra : "res/bloque_tierra.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
    pad :"res/pad.png",
    boton_disparo : "res/boton_disparo.png",
    boton_salto : "res/boton_salto.png",
    boton_pausa : "res/boton_pausa.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    mensaje_como_jugar : "res/mensaje_como_jugar.png",
    mensaje_ganar : "res/mensaje_ganar.png",
    mensaje_perder : "res/mensaje_perder.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            console.log("cargando imagen de indice " + indice);
            indice++;

            cargarImagenes(indice);
        } else {
            iniciarJuego();
            console.log("iniciar juego");
        }
    }
}