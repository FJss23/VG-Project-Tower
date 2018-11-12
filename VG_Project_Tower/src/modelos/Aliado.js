class Aliado extends Modelo {

    constructor(x,y){
        super(imagenes.aliado, x, y);

        this.aMover = new Animacion(imagenes.aliado,
            this.ancho, this.alto, 6, 1);

        this.animacion = this.aMover;

        this.vx = 1;
        this.vy = 0;
    }

    actualizar(){
        this.animacion.actualizar();
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }
}