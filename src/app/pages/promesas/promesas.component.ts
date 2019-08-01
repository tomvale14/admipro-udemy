import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres()
        .then(  mensaje => console.log('Exito en la Promesa', mensaje))
        .catch( error   => console.error('Error en la Promesa', error) );
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      // define un intervalo cada 1 segundo
      let intervalo = setInterval( () =>  {

        contador += 1;
        console.log( contador );

        if ( contador === 3 ) {
          resolve( true );                    // resuelve la promesa con éxito - bloque then
          // reject(false);                   // resuelve la promesa con error - bloque catch
          clearInterval( intervalo );   // pone a cero el intervalo
        }

      }, 1000 );

    });

  }

}
