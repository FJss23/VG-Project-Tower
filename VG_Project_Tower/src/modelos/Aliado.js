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

        this.aMover = new Animacion(img,this.ancho, this.alto, 4, 4);

        this.aMorir = new Animacion(imagenes.morir_npc,
            this.ancho, this.alto, 1, 3, this.finAnimacionMorir.bind(this));

        this.animacion = this.aMover;

        this.vx = vx;
        this.vy = vy;
        this.muerteActivada = false;
    }

    finAnimacionMorir(){
        gameLayer.iniciar();
    }

    actualizar(){
        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
        }

        if (this.estado == estados.muriendo) {
            this.vx = 0;
        }
    }

    atacado(){
        if(!this.muerteActivada) {
            if (this.estado != estados.muriendo) {
                this.estado = estados.muriendo;
                this.muerteActivada = true;
            }
        }
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }
}