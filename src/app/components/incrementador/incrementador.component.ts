import { Component, Input, Output, ViewChild, OnInit, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})

/**
 * Componente HIJO
 */
export class IncrementadorComponent implements OnInit {

  // referencia a un elemento HTML
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // 'nombre' el el nombre del atributo en el .html
  // leyenda es el nombre del atributo en el .ts
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  // emite un número como un evento hacia el componente Padre
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // cuando se ejecuta el constructor todavía NO se han interpretado las variables de @Input
    // console.log('Leyenda: ', this.leyenda);
    // console.log('Progreso: ', this.progreso);
  }

  ngOnInit() {
    // cuando se inicializa el componente SI se han interpretado las variables de @Input
    // console.log('Leyenda: ', this.leyenda);
    // console.log('Progreso: ', this.progreso);
  }

  funcionCambiaProgreso( nuevoValor: number ) {

    // devuelve un array con todos los elemntos HTML que tengan como atributo name='progreso'
    // solo queremos el primer elemento
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    // console.log( this.txtProgress );

    if ( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    // emite el nuevo valor del incrementador al componente Padre
    this.cambioValor.emit( this.progreso );

  }

  cambiarValor(valor: number) {

    if ( this.progreso >= 100 && valor > 0 ) {
      return;
    }
    if ( this.progreso <= 0 && valor < 0 ) {
      return;
    }

    this.progreso = this.progreso + valor;

    // emite el cambio del valor del incrementador
    this.cambioValor.emit( this.progreso );

    // poner el foco en un elemento HTML
    this.txtProgress.nativeElement.focus();

  }

}
