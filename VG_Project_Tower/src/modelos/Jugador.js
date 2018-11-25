class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador, x, y)
        this.tiempoInvulnerable = 0;

        this.ratioEspada = 0.10;

        this.estado = estados.moviendo;
        this.orientacion = orientaciones.derecha;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aAtacandoDerecha = new Animacion(imagenes.ataque_derecha,
            86, 96, 1, 5, this.finAnimacionAtacar.bind(this) );
        this.aAtacandoIzquierda = new Animacion(imagenes.ataque_izquierda,
            86, 96, 1, 5, this.finAnimacionAtacar.bind(this));
        this.aAtacandoArriba = new Animacion(imagenes.ataque_arriba,
            80, 86, 1, 5, this.finAnimacionAtacar.bind(this));
        this.aAtacandoAbajo = new Animacion(imagenes.ataque_abajo,
            80, 86, 1, 5, this.finAnimacionAtacar.bind(this));

        this.aAtacandoEspecialDerecha = new Animacion(imagenes.ataque_derecha_especial,
            86, 96, 2, 5, this.finAnimacionAtacar.bind(this) );
        this.aAtacandoEspecialIzquierda = new Animacion(imagenes.ataque_izquierda_especial,
            86, 96, 2, 5, this.finAnimacionAtacar.bind(this));
        this.aAtacandoEspecialArriba = new Animacion(imagenes.ataque_arriba_especial,
            80, 86, 2, 5, this.finAnimacionAtacar.bind(this));
        this.aAtacandoEspecialAbajo = new Animacion(imagenes.ataque_abajo_especial,
            80, 86, 2, 5, this.finAnimacionAtacar.bind(this));

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
            46, 50, 1, 8);
        this.aCorriendoArriba =
            new Animacion(imagenes.caminar_arriba,
                46, 50, 1, 8);
        this.aCorriendoAbajo = new Animacion(imagenes.caminar_abajo,
            46, 50, 1, 8);

        this.aMorirArriba = new Animacion(imagenes.muerte_arriba,
            64, 66, 3, 5, this.finAnimacionMorir.bind(this));
        this.aMorirAbajo = new Animacion(imagenes.muerte_abajo,
            64, 66, 3, 5, this.finAnimacionMorir.bind(this));
        this.aMorirIzquierda = new Animacion(imagenes.muerte_izquierda,
            64, 66, 3, 5, this.finAnimacionMorir.bind(this));
        this.aMorirDerecha = new Animacion(imagenes.muerte_derecha,
            64, 66, 3, 5, this.finAnimacionMorir.bind(this));

        this.animacion = this.aIdleDerecha;

        this.cadenciaEspada = 1;
        this.tiempoEspada = 0;
    }

    ataqueEspada(){
        if ( this.tiempoEspada == 0) {
            // reiniciar Cadencia
            this.estado = estados.atacandoEspada;
            this.tiempoEspada = this.cadenciaEspada;
        }
    }

    finAnimacionAtacar(){
        this.estado = estados.moviendo;
    }

    finAnimacionMorir(){
        gameLayer.iniciar();
    }

    impactado(){
        this.estado = estados.impactado;
        gameLayer.espacio.eliminarCuerpoDinamico(this);
        gameLayer.espacio.agregarCuerpoEstatico(this);
    }

    disparar(){
        this.estado = estados.atacandoEspecial;
        return new AtaqueEspecial(this.x, this.y, this.orientacion);
    }


    actualizar(){

        this.animacion.actualizar();

        if(this.estado != estados.impactado) {
            // Establecer orientación
            if (this.vx > 0) {
                this.orientacion = orientaciones.derecha;
            }
            if (this.vx < 0) {
                this.orientacion = orientaciones.izquierda;
            }
            if (this.vy > 0) {
                this.orientacion = orientaciones.abajo;
            }
            if (this.vy < 0) {
                this.orientacion = orientaciones.arriba;
            }
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
           case estados.atacandoEspecial:
               if (this.orientacion == orientaciones.derecha) {
                   this.animacion = this.aAtacandoEspecialDerecha;
               }
               if (this.orientacion == orientaciones.izquierda) {
                   this.animacion = this.aAtacandoEspecialIzquierda;
               }
               if (this.orientacion == orientaciones.arriba) {
                   this.animacion = this.aAtacandoEspecialArriba;
               }
               if (this.orientacion == orientaciones.abajo) {
                   this.animacion = this.aAtacandoEspecialAbajo;
               }
               break;
           case estados.impactado:
               if (this.orientacion == orientaciones.derecha) {
                   this.animacion =  this.aMorirDerecha;
               }
               if (this.orientacion == orientaciones.izquierda) {
                   this.animacion =  this.aMorirIzquierda;
               }
               if (this.orientacion == orientaciones.arriba) {
                   this.animacion =  this.aMorirArriba;
               }
               if (this.orientacion == orientaciones.abajo) {
                   this.animacion =  this.aMorirAbajo;
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

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        if ( this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
        }
    }

    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    comprobarAtaqueEspada(modelo){
        var colisiona = false;
        if(this.estado == estados.atacandoEspada) {
            /*obtengo las dimensiones de un rectangulo mas pequeño dentro
                del propio jugador, y comprueba si colisiona con el modelo*/
            if (this.orientacion == orientaciones.derecha) {
                var xEspada = this.x + this.aAtacandoDerecha.modeloAncho * (0.5 - this.ratioEspada / 2);
                var yEspada = this.y;
                var espadaAncho = this.aAtacandoDerecha.modeloAncho * this.ratioEspada;
                var espadaAlto = this.aAtacandoDerecha.modeloAlto;
                if (modelo.x - modelo.ancho / 2 <= xEspada + espadaAncho / 2
                    && modelo.x + modelo.ancho / 2 >= xEspada - espadaAncho / 2
                    && yEspada + espadaAlto / 2 >= modelo.y - modelo.alto / 2
                    && yEspada - espadaAlto / 2 <= modelo.y + modelo.alto / 2) {

                    colisiona = true;

                }
            }
            if (this.orientacion == orientaciones.izquierda) {
                var xEspada = this.x - this.aAtacandoIzquierda.modeloAncho * (0.5 - this.ratioEspada / 2);
                var yEspada = this.y;
                var espadaAncho = this.aAtacandoIzquierda.modeloAncho * this.ratioEspada;
                var espadaAlto = this.aAtacandoIzquierda.modeloAlto;
                if (modelo.x - modelo.ancho / 2 <= xEspada + espadaAncho / 2
                    && modelo.x + modelo.ancho / 2 >= xEspada - espadaAncho / 2
                    && yEspada + espadaAlto / 2 >= modelo.y - modelo.alto / 2
                    && yEspada - espadaAlto / 2 <= modelo.y + modelo.alto / 2) {

                    colisiona = true;

                }
            }
            if (this.orientacion == orientaciones.abajo) {
                var xEspada = this.x;
                var yEspada = this.y + this.aAtacandoAbajo.modeloAlto * (0.5 - this.ratioEspada / 2);
                var espadaAncho = this.aAtacandoAbajo.modeloAncho;
                var espadaAlto = this.aAtacandoAbajo.modeloAlto * this.ratioEspada;
                if (modelo.x - modelo.ancho / 2 <= xEspada + espadaAncho / 2
                    && modelo.x + modelo.ancho / 2 >= xEspada - espadaAncho / 2
                    && yEspada + espadaAlto / 2 >= modelo.y - modelo.alto / 2
                    && yEspada - espadaAlto / 2 <= modelo.y + modelo.alto / 2) {

                    colisiona = true;

                }
            }
            if (this.orientacion == orientaciones.arriba) {
                var xEspada = this.x;
                var yEspada = this.y - this.aAtacandoArriba.modeloAlto * (0.5 - this.ratioEspada / 2);
                var espadaAncho = this.aAtacandoArriba.modeloAncho;
                var espadaAlto = this.aAtacandoArriba.modeloAlto * this.ratioEspada;
                if (modelo.x - modelo.ancho / 2 <= xEspada + espadaAncho / 2
                    && modelo.x + modelo.ancho / 2 >= xEspada - espadaAncho / 2
                    && yEspada + espadaAlto / 2 >= modelo.y - modelo.alto / 2
                    && yEspada - espadaAlto / 2 <= modelo.y + modelo.alto / 2) {

                    colisiona = true;

                }
            }
        }
        return colisiona;
    }
}