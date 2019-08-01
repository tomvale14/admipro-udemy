import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  // creo una referencia al observador que se está ejecutando, que es de tipo Subscription
  subscription: Subscription;

  
  constructor() {

    // para mantener una referencia a la subscripción
    this.subscription = this.regresaObservable()
        // .pipe( retry(2) )

    /*
     * Para poder escuchar el trabajo del observador,
     * necesito SUBSCRIBIRME al OBSERVADOR:
     */
    .subscribe(
       // 1.- El primer callback se refiere a qué información estoy recibiendo, la información del next
       numero => console.log( 'Subs ', numero ),
       // 2.- El segundo callback se refiere al error que se pueda producir
       error => console.error( 'Error en el observador', error ),
       // 3.- El tercer callback se produce cuando se termina el observador ( no recibe ningún parámetro )
       () => console.log( 'El observador terminó ')
    );
  }

  ngOnInit() {
  }

  /**
   * Esta función se dispara cada vez que se abandone la página
   */
  ngOnDestroy() {
    console.log( 'La página se va a cerrar' );
    // si queremos eliminar la subscripción para que no siga devolviendo valores
    this.subscription.unsubscribe();
  }

  /**
   * Función que devuelve un Observable.
   */
  regresaObservable(): Observable<any> {

    let contador = 0;

    // el parámetro observer es de tipo Subscriber
    return new Observable( (observer: Subscriber<any>) => {

      const intervalo = setInterval( () => {

        contador++;

        /* Vamos a suponer que consumimos el servicio,
         * pero lo que devuelve dicho servicio es un objeto.
         */
        const salida = {
          valor: contador
        };

        // la función next() del observable emite el valor de contador
        observer.next( salida );

        // if ( contador === 3 ) {
        //     // borra el intervalo
        //     clearInterval( intervalo );
        //     // la función complete() del observable detiene el observable
        //     observer.complete();
        // }

        // podemos manejar errores
        // if ( contador === 2 ) {
        //     // clearInterval( intervalo );
        //     observer.error('Auxilio!');
        // }

      }, 1000 );

    /*
     * La respuesta del Observable la puedo filtrar con el operador map
     * para transformar la información que necesite.
     */
    }).pipe(
        map( respuesta => respuesta.valor ),
        // el operador filter recibe como argumento una función que devuelva true o false
        filter( ( valor, index ) => {
          // valor de la respuesta, nº de veces en base cero que he recibido notificaciones del observador
          // console.log('Filter: ', valor, index);

          // Si queremos que solo devuelva los números impares
          if ( (valor % 2) === 1 ) {
            // impar
            return true;
          } else {
            // par
            return false;
          }
        })
      );

  }

}
