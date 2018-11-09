class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.guerrero_quieto_der, x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;

        this.estado = estados.moviendo;
        this.orientacion = orientaciones.derecha;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aDispararDerecha = new Animacion(imagenes.guerrero_atacar_der,
            this.ancho, this.alto, 6, 3, this.finAnimacionDisparar.bind(this) );
        // No pasar funciones del DIRECTAMNTE COMO callback
        // El objeto que ejecute la función no sabrá interpretar el "this."

        this.aDispararIzquierda = new Animacion(imagenes.guerrero_atacar_izq,
            this.ancho, this.alto, 6, 3, this.finAnimacionDisparar.bind(this));

        this.aIdleDerecha = new Animacion(imagenes.guerrero_quieto_der,
            this.ancho, this.alto, 6, 1);
        this.aIdleIzquierda = new Animacion(imagenes.guerrero_quieto_izq,
            this.ancho, this.alto, 6, 1);
        this.aCorriendoDerecha =
            new Animacion(imagenes.guerrero_correr_der,
            this.ancho, this.alto, 8, 5);
        this.aCorriendoIzquierda = new Animacion(imagenes.guerrero_correr_izq,
            this.ancho, this.alto, 8, 5, null);
        /*this.aSaltandoDerecha = new Animacion(imagenes.jugador_saltando_derecha,
            this.ancho, this.alto, 6, 4, null );
        this.aSaltandoIzquierda = new Animacion( imagenes.jugador_saltando_izquierda,
            this.ancho, this.alto, 6, 4, null);
        */
        this.animacion = this.aIdleDerecha;

        // Disparo
        this.cadenciaDisparo = 1;
        this.tiempoDisparo = 0;
    }

    disparar(){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;

            reproducirEfecto(efectos.disparo);

            var disparo = new DisparoJugador(this.x, this.y);
            if ( this.orientacion == orientaciones.izquierda ){
                disparo.vx = disparo.vx*-1; //invertir
            }
            return disparo;
        } else {
            return null;
        }
    }

    finAnimacionDisparar(){
        this.estado = estados.moviendo;
    }

    golpeado (){
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 100;
                // 100 actualizaciones de loop
            }
        }
    }

    actualizar(){
        /*
        if (this.enElAire && this.estado == estados.moviendo ){
            this.estado = estados.saltando;
        }
        if (!this.enElAire && this.estado == estados.saltando ){
            this.estado = estados.moviendo;
        }
        */
        if (this.tiempoInvulnerable > 0 ){
            this.tiempoInvulnerable--;
        }

        this.animacion.actualizar();

        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }

        // Selección de animación
       switch (this.estado){
           /*case estados.saltando:
               if (this.orientacion == orientaciones.derecha){
                   this.animacion = this.aSaltandoDerecha;
               }
               if (this.orientacion == orientaciones.izquierda){
                   this.animacion = this.aSaltandoIzquierda;
               }
               break;*/
           case estados.disparando:
               if (this.orientacion == orientaciones.derecha) {
                   this.animacion = this.aDispararDerecha;
               }
               if (this.orientacion == orientaciones.izquierda) {
                   this.animacion = this.aDispararIzquierda;
               }
               break;
           case estados.moviendo:
               if ( this.vx != 0 ) {
                   if (this.orientacion == orientaciones.derecha) {
                       this.animacion = this.aCorriendoDerecha;
                   }
                   if (this.orientacion == orientaciones.izquierda) {
                       this.animacion = this.aCorriendoIzquierda;
                   }
               }
               if ( this.vx == 0){
                   if (this.orientacion == orientaciones.derecha) {
                       this.animacion = this.aIdleDerecha;
                   }
                   if (this.orientacion == orientaciones.izquierda) {
                       this.animacion = this.aIdleIzquierda;
                   }
               }
               break;
       }


        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }
    }

    dibujar (scrollX){
        scrollX = scrollX || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y);
        }
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }


}