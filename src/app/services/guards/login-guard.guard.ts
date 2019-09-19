import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  /** para poder usar el servicio UsuarioService lo tengo que inyectar */
  constructor( public _usuarioService: UsuarioService,
               public router: Router ) { }

  canActivate() {

    // console.log('Pasó por el Login Guard');

    if ( this._usuarioService.estaLogueado() ) {
      console.log('PASO el GUARD');
      return true;
    } else {
      console.log('BLOQUEADO por el GUARD');  // => para probar el bloqueo debemos salir previamente de la cuenta de Google
      this.router.navigate(['/login']);
      return false;
    }

    return true;

  }

}
