class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador, x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;

        this.estado = estados.moviendo;
        this.orientacion = orientaciones.derecha;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aAtacandoDerecha = new Animacion(imagenes.ataque_derecha,
            85, 85, 2, 5, this.finAnimacionDisparar.bind(this) );
        this.aAtacandoIzquierda = new Animacion(imagenes.ataque_izquierda,
            85, 85, 2, 5, this.finAnimacionDisparar.bind(this));
        this.aAtacandoArriba = new Animacion(imagenes.ataque_arriba,
            85, 85, 2, 5, this.finAnimacionDisparar.bind(this));
        this.aAtacandoAbajo = new Animacion(imagenes.ataque_abajo,
            80, 85, 2, 5, this.finAnimacionDisparar.bind(this));

        this.aIdleDerecha = new Animacion(imagenes.idle_derecha,
            50, 50, 3, 8);
        this.aIdleIzquierda = new Animacion(imagenes.idle_izquierda,
            50, 50, 3, 8);
        this.aIdleArriba = new Animacion(imagenes.idle_arriba,
            50, 50, 3, 8);
        this.aIdleAbajo = new Animacion(imagenes.idle_abajo,
            50, 50, 3, 8);
        this.aCorriendoDerecha =
            new Animacion(imagenes.caminar_derecha,
            46, 50, 1, 8);
        this.aCorriendoIzquierda = new Animacion(imagenes.caminar_izquierda,
            46, 50, 1, 8, null);
        this.aCorriendoArriba =
            new Animacion(imagenes.caminar_arriba,
                46, 50, 1, 8);
        this.aCorriendoAbajo = new Animacion(imagenes.caminar_abajo,
            46, 50, 1, 8, null);

        this.animacion = this.aIdleDerecha;

        // Disparo
        this.cadenciaEspada = 1;
        this.tiempoEspada = 0;

    }

    ataqueEspada(){
        if ( this.tiempoEspada == 0) {
            // reiniciar Cadencia
            this.estado = estados.atacandoEspada;
            this.tiempoEspada = this.cadenciaEspada;

            //reproducirEfecto(efectos.disparo);
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
        if ( this.vy > 0 ){
            this.orientacion = orientaciones.abajo;
        }
        if ( this.vy < 0 ){
            this.orientacion = orientaciones.arriba;
        }


        // Selección de animación
       switch (this.estado){
           case estados.atacandoEspada:
               if (this.orientacion == orientaciones.derecha) {
                   this.animacion = this.aAtacandoDerecha;
               }
               if (this.orientacion == orientaciones.izquierda) {
                   this.animacion = this.aAtacandoIzquierda;
               }
               if (this.orientacion == orientaciones.arriba) {
                   this.animacion = this.aAtacandoArriba;
               }
               if (this.orientacion == orientaciones.abajo) {
                   this.animacion = this.aAtacandoAbajo;
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
               if ( this.vy != 0){
                   if (this.orientacion == orientaciones.arriba) {
                       this.animacion = this.aCorriendoArriba;
                   }
                   if (this.orientacion == orientaciones.abajo) {
                       this.animacion = this.aCorriendoAbajo;
                   }
               }
               if ( this.vy == 0){
                   if (this.orientacion == orientaciones.arriba) {
                       this.animacion = this.aIdleArriba;
                   }
                   if (this.orientacion == orientaciones.abajo) {
                       this.animacion = this.aIdleAbajo;
                   }
               }
               break;
       }


        // Tiempo Disparo
        if ( this.tiempoEspada > 0 ) {
            this.tiempoEspada--;
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