class Enemigo extends Modelo {

    constructor(x, y, vx, vy) {
        super(imagenes.enemigo, x, y)

        var imagen;

        if(vx > 0){
            imagen = imagenes.enemigo_mover_derecha;
        }
        else if(vx < 0){
            imagen = imagenes.enemigo_mover_izquierda;
        }
        else if(vy > 0){
            imagen = imagenes.enemigo_mover_abajo;
        }
        else{
            imagen = imagenes.enemigo_mover_arriba;
        }

        this.aMover = new Animacion(imagen,
            this.ancho, this.alto, 4, 4);

        this.aExplotar = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 3, 7, this.finAnimacionExplotar.bind(this));

        this.aMorir = new Animacion(imagenes.morir_npc,
            this.ancho, this.alto, 1, 3, this.finAnimacionMorir.bind(this));

        this.animacion = this.aMover;

        this.vy = vy;
        this.vx = vx;

        this.tieneRecolectable = Math.random() <= 0.5;

        this.muerteActivada = false;
    }

    finAnimacionExplotar(){
        this.estado = estados.impactado;
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){

        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.explotando:
                this.animacion = this.aExplotar;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
        }

        if ( this.estado == estados.explotando ||
        this.estado == estados.muriendo) {
            this.vx = 0;
            this.vy = 0;
        }
    }

    impactado(){
        if ( this.estado != estados.explotando ){
            reproducirEfecto(efectos.explosion);
            this.estado = estados.explotando;
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

    enemigoConRecolectable(){
        if(this.tieneRecolectable == true){
            return new Recolectable(this.x, this.y);
        }
        return null;
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}