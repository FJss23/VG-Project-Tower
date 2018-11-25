class AtaqueEspecial extends Modelo {

    constructor(x, y, orientacion) {
        super(imagenes.disparo_especial, x, y)
        this.vx = 0;
        this.vy = 0;

        var imagen, ancho, alto;

        if(orientacion == orientaciones.derecha){
            imagen = imagenes.disparo_especial_derecha;
            ancho = 14;
            alto = 58;
            this.vx = 7;
        }
        else if(orientacion == orientaciones.izquierda){
            imagen = imagenes.disparo_especial_izquierda;
            ancho = 14;
            alto = 58;
            this.vx = -7;
        }
        else if(orientacion == orientaciones.abajo){
            imagen = imagenes.disparo_especial_abajo;
            ancho = 60;
            alto = 16;
            this.vy = 7;
        }
        else {
            imagen = imagenes.disparo_especial_arriba;
            ancho = 60;
            alto = 16;
            this.vy = -7;
        }

        this.animacion = new Animacion(imagen, ancho, alto, 3, 2);

        /*console.log("nuevo ataque especial generado -> ALTO: " + this.animacion.rectanguloDibujo.alto
        + ", ANCHO: " + this.animacion.rectanguloDibujo.ancho + ", FRAME_ANCHO: " + this.animacion.frameAncho
        + ", FRAME_ALTO: " + this.animacion.frameAlto + ", IMAGEN_ANCHO: " + this.animacion.imagen.width +
        ", FRAMES_TOTALES: " + this.animacion.framesTotales + ", IMAGEN: " + this.animacion.imagen.src);*/
    }

    actualizar(){
        this.animacion.actualizar();
        this.x += this.vx;
        this.y += this.vy;
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}