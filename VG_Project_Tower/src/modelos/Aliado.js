class Aliado extends Modelo {

    constructor(x, y, vx, vy){
        super(imagenes.aliado, x, y);

        var img;

        if(vx > 0){
            img = imagenes.aliado_mover_derecha;
        }
        else if(vx < 0){
            img = imagenes.aliado_mover_izquierda;
        }
        else if(vy > 0){
            img = imagenes.aliado_mover_abajo;
        }
        else {
            img = imagenes.aliado_mover_arriba;
        }

        this.aMover = new Animacion(img,
            this.ancho, this.alto, 4, 4);

        this.animacion = this.aMover;

        this.vx = vx;
        this.vy = vy;
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}