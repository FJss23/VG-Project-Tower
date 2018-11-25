// Precargado de recursos

// CUIDADO CON EL disparo_jugador
var imagenes = {
    jugador: "res/jugador.png",
    enemigo : "res/enemigo.png",
    aliado : "res/aliado.png",

    hierba:"res/hierba.png",
    bloque_tierra: "res/bloque_tierra.png",

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
    vida_torre: "res/vida_torre.png",

    disparo_especial: "res/disparo_especial.png",
    disparo_especial_derecha: "res/disparo_especial_derecha.png",
    disparo_especial_izquierda: "res/disparo_especial_izquierda.png",
    disparo_especial_arriba: "res/disparo_especial_arriba.png",
    disparo_especial_abajo: "res/disparo_especial_abajo.png",

    ataque_abajo_especial : "res/ataque_abajo_especial.png",
    ataque_arriba_especial : "res/ataque_arriba_especial.png",
    ataque_derecha_especial : "res/ataque_derecha_especial.png",
    ataque_izquierda_especial : "res/ataque_izquierda_especial.png",

    aliado_mover_arriba: "res/aliado_caminar_arriba.png",
    aliado_mover_abajo: "res/aliado_caminar_abajo.png",
    aliado_mover_derecha: "res/aliado_caminar_derecha.png",
    aliado_mover_izquierda: "res/aliado_caminar_izquierda.png",

    enemigo_mover_arriba: "res/enemigo_caminar_arriba.png",
    enemigo_mover_abajo: "res/enemigo_caminar_abajo.png",
    enemigo_mover_derecha: "res/enemigo_caminar_derecha.png",
    enemigo_mover_izquierda: "res/enemigo_caminar_izquierda.png",

    enemigo_morir : "res/enemigo_morir.png",
    morir_npc : "res/morir_NPC.png",

    recolectable_jugador: "res/recolectable_jugador.png",
    recolectable_jugador_img: "res/recolectable_jugador_img.png",

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
            indice++;

            cargarImagenes(indice);
        } else {
            iniciarJuego();
            console.log("iniciar juego");
        }
    }
}