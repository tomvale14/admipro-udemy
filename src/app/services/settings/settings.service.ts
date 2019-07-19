import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  // defino la propiedad ajustes de tipo objeto que cumple el interfaz Ajustes
  // y que tiene las propiedades por defecto siguientes
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  /**
   * Lee los ajustes en cuanto se carga la aplicación.
   */
  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  /**
   * Lee las propiedades de los ajustes del localStorage
   */
  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {                         // EXISTE un tema guardado
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      // console.log('Cargando del localStorage');

      // aplica el tema desde el localStorage
      this.aplicarTema( this.ajustes.tema );
    } else {                                                         // NO EXISTE un tema guardado
      // console.log('Usando valores por defecto');

      // cuando no existe ningún tema cargado => utiliza los valores por defecto
      this.aplicarTema( this.ajustes.tema );
    }
  }

  /**
   * Aplica el tema seleccionado.
   * @param tema    clase .css con el tema seleccionado si existe o si no el de por defecto.
   */
  aplicarTema( tema: string ) {

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute( 'href', url );

    // Guardamos los ajustes en el localStorage
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

  /**
   * Graba los ajustes en el localStorage
   */
  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
