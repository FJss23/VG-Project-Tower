class GeneradorNPC extends Modelo {

    constructor(imagen, x,y){
        super(imagen, x, y);

        // Tiempo de generación de personajes
        this.cadenciaGeneracionEnemigo = 300;
        this.tiempoGeneracionEnemigo = 0;

        this.cadenciaGeneracionAliado = 400;
        this.tiempoGeneracionAliado = 0;
    }

    actualizar(){
        if(this.tiempoGeneracionAliado > 0){
            this.tiempoGeneracionAliado--;
        }
        if(this.tiempoGeneracionEnemigo > 0){
            this.tiempoGeneracionEnemigo--;
        }
    }

    generarAliado(){
        if(this.tiempoGeneracionAliado == 0){
            this.tiempoGeneracionAliado = this.cadenciaGeneracionAliado;
            console.log("Aliado generado");
            return new Aliado(this.x + 10, this.y);
        }
        return null;
    }

    generarEnemigo(){
        if(this.tiempoGeneracionEnemigo == 0) {
            this.tiempoGeneracionEnemigo = this.cadenciaGeneracionEnemigo;
            console.log("Enemigo generado");
            return new Enemigo(this.x + 10, this.y);
        }
        return null;
    }
}