import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  /**
   * Inyectamos el servicio en el constructor del componente principal de la aplicación.
   * Con esta definición lo que hace el disparar el constructor de SettingsService
   * @param _ajustes  instancia del servicio SettingsService
   */
  constructor( public _ajustes: SettingsService ) { }
}
