class AtaqueEspecial extends Modelo {

    constructor(x, y, orientacion) {
        super(imagenes.disparo_especial, x, y)
        this.vx = 0;
        this.vy = 0;

        var imagen, ancho, alto;

        if(orientacion == orientaciones.derecha){
            imagen = imagenes.disparo_especial_derecha;
            ancho = 26/2;
            alto = 57;
            this.vx = 7;
        }
        else if(orientacion == orientaciones.izquierda){
            imagen = imagenes.disparo_especial_izquierda;
            ancho = 26/2;
            alto = 57;
            this.vx = -7;
        }
        else if(orientacion == orientaciones.abajo){
            imagen = imagenes.disparo_especial_abajo;
            ancho = this.ancho;
            alto = this.alto;
            this.vy = 7;
        }
        else if(orientacion == orientaciones.arriba){
            imagen = imagenes.disparo_especial_arriba;
            ancho = this.ancho;
            alto = this.alto;
            this.vy = -7;
        }

        this.animacion = new Animacion(imagen,
            ancho, alto, 3, 2);
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}