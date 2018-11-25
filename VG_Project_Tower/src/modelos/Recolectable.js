class Recolectable extends Modelo {

    constructor(x, y,){
        super(imagenes.recolectable_jugador_img, x, y,);

        this.animacion = new Animacion(imagenes.recolectable_jugador,
            28, 36, 4, 4);
    }

    actualizar () {
        // Actualizar animación
        this.animacion.actualizar();
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}