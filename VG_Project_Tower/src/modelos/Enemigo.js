class Enemigo extends Modelo {

    constructor(x, y, vx, vy) {
        super(imagenes.enemigo, x, y)
        /*this.estado = estados.moviendo;
        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;*/

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
        else if(vy < 0){
            imagen = imagenes.enemigo_mover_arriba;
        }

        this.aMover = new Animacion(imagen,
            this.ancho, this.alto, 4, 4);

        this.aMorir = new Animacion(imagenes.enemigo_morir,
            this.ancho, this.alto, 3, 7, this.finAnimacionMorir.bind(this));
        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = vy;
        this.vx = vx;

        //this.tieneRecolectable = Math.floor(Math.random() * 4) < 2 ? true: false;
        this.tieneRecolectable = true;
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    actualizar (){
        // Actualizar animación
        this.animacion.actualizar();

                switch (this.estado){
                    case estados.moviendo:
                        this.animacion = this.aMover;
                        break;
                    case estados.muriendo:
                        this.animacion = this.aMorir;
                        break;
                }

                        if ( this.estado == estados.muriendo) {
                            this.vx = 0;
                            } /*else {

                                if ( this.vx == 0){
                                    this.vxInteligencia = this.vxInteligencia * -1;
                                    this.vx = this.vxInteligencia;
                                }

                                if (this.fueraPorDerecha ){
                                    // mover hacia la izquierda vx negativa
                                    if ( this.vxInteligencia > 0){
                                        this.vxInteligencia = this.vxInteligencia * -1;
                                    }
                                    this.vx = this.vxInteligencia;
                                }
                                if (this.fueraPorIzquierda ){
                                    // mover hacia la derecha vx positiva
                                    if ( this.vxInteligencia < 0){
                                        this.vxInteligencia = this.vxInteligencia * -1;
                                    }
                                    this.vx = this.vxInteligencia;
                                }

                            }*/
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    enemigoConRecolectable(){
        if(this.tieneRecolectable == true){
            console.log("enemigo con recolectable");
            return new Recolectable(this.x, this.y);
        }
        return null;
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        this.animacion.dibujar(this.x - scrollX, this.y);
    }

}