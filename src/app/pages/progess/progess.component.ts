import { Component, OnInit } from '@angular/core';
import { injectComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styles: []
})

/**
 * Componente PADRE
 */
export class ProgessComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // No es necesario crear una función para una sóla línea, se pone el valor directamente en el .html

  // actualizarProgress( event: number ) {
  //   console.log('Evento: ', event);
  //   this.progreso1 = event;
  // }

  // cambiarValor(valor: number) {

  //   if ( this.progreso >= 100 && valor > 0 ) {
  //     return;
  //   }
  //   if ( this.progreso <= 0 && valor < 0 ) {
  //     return;
  //   }
  //   this.progreso = this.progreso + valor;
  // }

}
