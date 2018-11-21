class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480/2, 320/2);
        this.pausa = true;
        this.iniciar();

    }

    iniciar() {
        //reproducirMusica();

        //this.botonSalto = new Boton(imagenes.boton_salto,480*0.9,320*0.55);
        this.botonEspada = new Boton(imagenes.boton_disparo,480*0.75,320*0.83);
        this.pad = new Pad(480*0.14,320*0.8);
        this.espacio = new Espacio(0);

        this.scrollX = 0;
        this.bloques = [];

        this.numRecolectables = new Texto(0,480*0.7,320*0.09);
        this.fondoTorre =
            new Fondo(imagenes.vida_torre, 480*0.85,320*0.07 );
        this.fondoRecolectable =
            new Fondo(imagenes.recolectable_jugador_img, 480*0.65,320*0.07);

        this.jugador = new Jugador(50, 50);
        //this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.ataquesEspeciales = [];

        this.generadores = [];
        this.aliados = [];
        this.enemigos = [];
        this.recolectables = [];

        this.cargarMapa("res/"+nivelActual+".txt");
    }

    actualizar (){
        if (this.pausa){
            return;
        }
        /*
        if ( this.copa.colisiona(this.jugador)){
            nivelActual++;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.pausa = true;
            this.mensaje =
                new Boton(imagenes.mensaje_ganar, 480/2, 320/2);
            this.iniciar();
        }


        // Jugador se cae
        if ( this.jugador.y > 480 ){
            this.iniciar();
        }
        */
        this.espacio.actualizar();
        this.jugador.actualizar();

        for(var i = 0; i < this.generadores.length; i++){
            this.generadores[i].actualizar();

            var aliado = this.generadores[i].generarAliado();
            if(aliado != null){
                this.aliados.push(aliado);
                this.espacio.agregarCuerpoDinamico(aliado);
            }
            var enemigo = this.generadores[i].generarEnemigo();
            if(enemigo != null){
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
            }
        }

        for(var i = 0; i < this.aliados.length; i++){
            if(this.aliados[i] != null && this.torre.colisiona(this.aliados[i])){
                this.espacio.eliminarCuerpoDinamico(this.aliados[i]);
                this.aliados.splice(i, 1);
            }
        }

        for(var i = 0; i < this.enemigos.length; i++){
            if(this.enemigos[i] != null &&
            this.enemigos[i].colisiona(this.torre)){

                this.enemigos[i].impactado();
            }
        }

        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }

        for(var i = 0; i < this.recolectables.length; i++){
            this.recolectables[i].actualizar();
        }

        // Eliminar disparos fuera de pantalla
        /*for (var i=0; i < this.ataquesEspeciales.length; i++) {
            for (var j = 0; j < this.espacio.estaticos.length; j++) {
                if (this.ataquesEspeciales[i] != null &&
                    this.ataquesEspeciales[i].colisiona(this.espacio.estaticos[j])) {

                    /*if (!this.ataquesEspeciales[i].estaEnPantalla() ||
                        (this.disparosJugador[i].vx == 0 && this.disparosJugador[i].vy == 0)
                        || (this.disparosJugador[i].colisiona(this.bloques[j]) &&
                            !this.bloques[j].fondo)) {
*/
                        /*this.espacio
                            .eliminarCuerpoDinamico(this.ataquesEspeciales[i]);
                        this.ataquesEspeciales.splice(i, 1);*/
                    /*}
                }
            }*/



        for(var i = 0; i < this.enemigos.length; i++){
            if(this.enemigos[i] != null &&
                this.enemigos[i].estado == estados.muerto){
                this.espacio.eliminarCuerpoDinamico(this.enemigos[i]);
                this.enemigos.splice(i, 1);
                this.puntos.valor--;
                if(this.puntos.valor == 0){
                    this.iniciar();
                }
            }
        }

        for (var i=0; i < this.ataquesEspeciales.length; i++) {
            this.ataquesEspeciales[i].actualizar();
        }

        // colisiones
        /*for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0){
                    this.iniciar();
                }
            }
        }*/
        // colisiones , ataqueEspecial - Enemigo
        for (var i=0; i < this.ataquesEspeciales.length; i++){
            for (var j=0; j < this.enemigos.length; j++){

                if (this.ataquesEspeciales[i] != null &&
                    this.enemigos[j] != null &&
                    this.ataquesEspeciales[i].colisiona(this.enemigos[j])) {

                        /*this.espacio
                            .eliminarCuerpoDinamico(this.ataquesEspeciales[i]);
                        this.ataquesEspeciales.splice(i, 1);
                        this.enemigos[j].impactado();*/

                    this.espacio.eliminarCuerpoDinamico(this.enemigos[j]);
                    this.enemigos.splice(j, 1);

                }
            }
        }
        /*
        // Enemigos muertos fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto  ) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);
                this.enemigos.splice(j, 1);

            }
        }*/

        // Comprobar colision de la espada con el enemigo
        for(var i = 0; i < this.enemigos.length; i++){
            if(this.enemigos[i] != null){
                if(this.jugador.comprobarAtaqueEspada(this.enemigos[i])){
                    var recolectable = this.enemigos[i].enemigoConRecolectable();
                    if(recolectable != null){
                        this.recolectables.push(recolectable);
                        this.espacio.agregarCuerpoDinamico(recolectable);
                    }
                    this.espacio.eliminarCuerpoDinamico(this.enemigos[i]);
                    this.enemigos.splice(i, 1);
                }
            }
        }

        // Comprobar colision de la espada con el enemigo
        for(var i = 0; i < this.aliados.length; i++){
            if(this.aliados[i] != null){
                if(this.jugador.comprobarAtaqueEspada(this.aliados[i])){
                    this.iniciar();
                }
            }
        }

        for(var i = 0; i < this.recolectables.length; i++){
            if(this.recolectables[i] != null){
                if(this.jugador.colisiona(this.recolectables[i])){
                    this.espacio.eliminarCuerpoDinamico(this.recolectables[i]);
                    this.recolectables.splice(i,1);
                    if(this.numRecolectables.valor < 5){
                        this.numRecolectables.valor++;
                    }
                }
            }
        }
    }

    calcularScroll(){
        // limite izquierda
        if ( this.jugador.x > 480 * 0.3) {
            if (this.jugador.x - this.scrollX < 480 * 0.3) {
                this.scrollX = this.jugador.x - 480 * 0.3;
            }
        }

        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.3 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.7) {
                this.scrollX = this.jugador.x - 480 * 0.7;
            }
        }
    }

    dibujar (){
        this.calcularScroll();
        //this.fondo.dibujar();
        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX);
        }

        this.jugador.dibujar(this.scrollX);

        for(var i = 0; i < this.generadores.length; i++){
            this.generadores[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.aliados.length; i++){
            this.aliados[i].dibujar(this.scrollX);
        }
        this.torre.dibujar(this.scrollX);
        for(var i = 0; i < this.recolectables.length; i++){
            this.recolectables[i].dibujar(this.scrollX);
        }
        for (var i=0; i < this.ataquesEspeciales.length; i++) {
            this.ataquesEspeciales[i].dibujar(this.scrollX);
        }
        //his.fondoPuntos.dibujar();
        this.fondoRecolectable.dibujar();
        this.fondoTorre.dibujar();
        this.puntos.dibujar();
        this.numRecolectables.dibujar();

        if ( !this.pausa && entrada == entradas.pulsaciones) {
            this.botonEspada.dibujar();
            //this.botonSalto.dibujar();
            this.pad.dibujar();
        }
        if ( this.pausa ) {
            this.mensaje.dibujar();
        }
    }

    calcularPulsaciones(pulsaciones){
        // Suponemos botones no estan pulsados
        this.botonEspada.pulsado = false;
        //this.botonSalto.pulsado = false;
        // suponemos que el pad esta en el centro
        controles.moverX = 0;
        // Suponemos a false
        controles.continuar = false;

        for(var i=0; i < pulsaciones.length; i++){
            // Muy simple cualquier click en pantalla lo activa
            if(pulsaciones[i].tipo == tipoPulsacion.inicio){
                controles.continuar = true;
            }

            if (this.pad.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                var orientacionY = this.pad.obtenerOrientacionY(pulsaciones[i].y);
                if ( orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = orientacionX;
                }
                if ( orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = orientacionX;
                }
                if ( orientacionY > 20) { // de 0 a 20 no contabilizamos
                    controles.moverY = orientacionY;
                }
                if ( orientacionY < -20) { // de -20 a 0 no contabilizamos
                    controles.moverY = orientacionY;
                }
            }

            if (this.botonEspada.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonEspada.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.espada = true;
                }
            }
            /*
            if (this.botonSalto.contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                this.botonSalto.pulsado = true;
                if ( pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }*/

        }

        // No pulsado - Boton espada
        if ( !this.botonEspada.pulsado ){
            controles.espada = false;
        }

        // No pulsado - Boton Salto
        /*if ( !this.botonSalto.pulsado ){
            controles.moverY = 0;
        }*/
    }


    procesarControles( ){
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }

        if (  controles.espada ){
            this.jugador.ataqueEspada();
            controles.espada = false;
        }
        if(controles.ataqueEspecial) {
            if (this.numRecolectables.valor > 0){
                var nuevoAtaqueEspecial = this.jugador.disparar();
                if (nuevoAtaqueEspecial != null) {
                    //this.espacio.agregarCuerpoDinamico(nuevoAtaqueEspecial);
                    this.ataquesEspeciales.push(nuevoAtaqueEspecial);
                }
                this.numRecolectables.valor--;
            }
            controles.ataqueEspecial = false;
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);
        }

    }


    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }


    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case ".":
                var bloque = new Bloque(imagenes.hierba, x,y, true);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                break;
            case "C":
                this.torre = new Torre(x,y);
                this.torre.y = this.torre.y - this.torre.alto/2;
                this.espacio.agregarCuerpoEstatico(this.torre);

                this.puntos = new Texto(this.torre.vida,480*0.9,320*0.09 );

                var bloque = new Bloque(imagenes.hierba, x,y, true);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);

                break;
            case "1":
                this.jugador = new Jugador(x, y);
                this.jugador.y = this.jugador.y - this.jugador.alto/2;
                this.espacio.agregarCuerpoDinamico(this.jugador);

                var bloque = new Bloque(imagenes.hierba, x,y, true);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "2":
                var generador = new GeneradorNPC(imagenes.salida_izquierda,x, y, 1, 0);
                generador.y = generador.y - generador.alto/2;
                this.espacio.agregarCuerpoEstatico(generador);
                this.generadores.push(generador);

                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "3":
                var generador = new GeneradorNPC(imagenes.salida_arriba,x, y, 0, 1);
                generador.y = generador.y - generador.alto/2;
                this.espacio.agregarCuerpoEstatico(generador);
                this.generadores.push(generador);

                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "4":
                var generador = new GeneradorNPC(imagenes.salida_derecha,x, y, -1, 0);
                generador.y = generador.y - generador.alto/2;
                this.espacio.agregarCuerpoEstatico(generador);
                this.generadores.push(generador);

                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "5":
                var generador = new GeneradorNPC(imagenes.salida_abajo, x, y, 0, -1);
                generador.y = generador.y - generador.alto/2;
                this.espacio.agregarCuerpoEstatico(generador);
                this.generadores.push(generador);

                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x,y, false);
                bloque.y = bloque.y - bloque.alto/2;
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

}