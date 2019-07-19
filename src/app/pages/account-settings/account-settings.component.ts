import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // para poder acceder a todo el documento DOM
  constructor( public _ajustes: SettingsService ) { }

  /**
   * Cuando se cargue la página se coloca el ckeck
   */
  ngOnInit() {
    this.colocarCheck();
  }

  /**
   * Función que cambia el tema de la pantalla
   * @param tema   tema a aplicar
   * @param link   referencia del elemento seleccionado
   */
  cambiarColor( tema: string, link: any ) {

    // console.log( link );

    // 1. Aplicamos el check al elemento seleccionado => el atributo class va a contener la clase working,
    //    enviando la referencia del mismo a la función aplicarCheck
    this.aplicarCheck( link );

    // 2. Aplicamos el tema seleccionado
    this._ajustes.aplicarTema( tema );
  }

  /**
   * Función que recorre todos los elementos del .html para comprobar qué valor del atributo data-theme está seleccionado
   */
  aplicarCheck( link: any ) {

    // 1. Obtiene un array de selectores
    let selectores: any = document.getElementsByClassName('selector');

    // 2. Recorre el array de selectores
    for ( let ref of selectores ) {
      // 3. Si algún selector tiene la clase 'working' la borra
      ref.classList.remove('working');
    }

    // 4. Agrego la clase 'working' al link pasado como parámetro a la función,
    //    que es el que se ha seleccionado
    link.classList.add('working');
  }

  /**
   * Función que revisa qué elemento del HTML tiene la clase 'working'
   */
  colocarCheck() {

    let tema = this._ajustes.ajustes.tema;
    
    // 1. Obtiene un array de selectores
    let selectores: any = document.getElementsByClassName('selector');
    
    // 2. Recorre el array de selectores hasta que encuentra el selector que tiene el tema 
    for ( let ref of selectores ) {
      // 3. Cuando se carga la aplicación por primera vez en la función ngOnInit()
      //    NO existe ningún elemento del HTML con la clase 'working' que es la que marca el ckeck
      if ( ref.getAttribute('data-theme') === tema )  {
        // console.log(tema);
        ref.classList.add('working');
        break;  // sale del bucle
      }
    }
  }

}
