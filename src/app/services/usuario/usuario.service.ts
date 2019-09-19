import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

// importar el observable: operador map
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  // inyectar el servicio para poder realizar peticiones HTTP
  constructor( public http: HttpClient,
               public router: Router ) {
    // console.log('Servicio de usuario listo');
    /** Llamamos a la función cargarLocalStorage() siempre que se inicialice el servicio */
    this.cargarLocalStorage();
  }

  /**
   * Logout del usuario.
   *   => Resetea las variables 'usuario' y 'token'.
   *   => Borra el Local Storage.
   *   => Redirecciona a la página de login.
   */
  logout() {

    this.token = '';
    this.usuario = null;

    // => borrar variables del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // => redireccionar a /login
    this.router.navigate(['/login']);

  }

  /**
   * Login de usuario con el TOKEN de Google
   * @param token token de usuario de Google
   */
  loginGoogle( token: string ) {

    // URL de llamada POST => la misma que en Postman
    let url = URL_SERVICIOS + '/login/google';

    // => en el body va el token como un objeto, con el valor pasado como parámetro
    return this.http.post( url, { token } )
                  // => resp es la respuesta que obtengo del servicio POST
                  .pipe( map( (resp: any) => {
                      // => llama a la función para guardar la información en el Local Storage
                      this.guardarLocalStorage( resp.id, resp.token, resp.usuario );
                      // devuelve true a la llamada del servicio
                      return true;
                  }));
  }

  /**
   * Realiza la petición POST del LOGIN del usuario.
   * @param usuario    modelo Usuario
   * @param recordar   checkbox 'recuerdame'
   */
  login( usuario: Usuario, recordar: boolean = false ) {

    // 1. Si está activado 'recordar' que guarde el email en el Local Storage.
    //    => En caso contrario que lo borre. Si no existe no da error.
    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }


    let url = URL_SERVICIOS + '/login';

    // 2. Al llamar al servicio en el login del usuario, no queremos modificar el código
    //    por lo que es aquí donde cogemos los datos de la respuesta y lo guardamos en el Local Storage
    return this.http.post( url, usuario )
                .pipe( map( (resp: any) => {
                  // guardar en el Local Storage la información de la respuesta del usuario
                  // Nota: en el Local Storage solamente se pueden guardar strings,
                  //       por lo que si quiero guardar el usuario, al ser un objeto,
                  //       se utiliza la función JSON.stringify( resp.usuario ) );
                  // localStorage.setItem( 'id', resp.id );
                  // localStorage.setItem( 'token', resp.token );
                  // localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ) );

                  this.guardarLocalStorage( resp.id, resp.token, resp.usuario );

                  // devuelve true a la llamada del servicio
                  return true;
                }));

  }

  /**
   * Crea un nuevo usuario cuando se pincha en el botón 'REGISTRARME' de la pantalla de Registro
   * @param usuario   modelo de tipo Usuario del archivo usuario.js
   */
  crearUsuario( usuario: Usuario ) {

    // 1. URL de la petición para crear usuario
    let url = URL_SERVICIOS + '/usuario';

    // 2. Petición POST de la URL definida en el BACKEND SERVER
    //    => llama a un observador al cual nos vamos a poder subscribir
    //       para que me notifique cuando se haya hecho la petición POST.
    return this.http.post( url, usuario )
                .pipe( map( (resp: any ) => {

                  // 2.1 Si todo va bien => lanza el sweetalert
                  Swal.fire( 'Usuario creado', usuario.email, 'success' );
                  return resp.usuario;

                }));

  }

  /**
   * Guardar en el Local Storage la información del usuario de Google que queremos manejar.
   * Tambien comprueba si el usuario está autenticado.
   * 
   * @param id 
   * @param token 
   * @param usuario   modelo de Usuario de la aplicación
   */
  guardarLocalStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

  // => Comprobar si el usuario está autenticado
    this.usuario = usuario;
    this.token = token;
  }

  /**
   * Para resolver el problema de que no puede leer el 'token' y el 'usuario'cuando recargo la página.
   *   => compruebo si existe un valor del 'token' en el Local Storage
   */
  cargarLocalStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  /**
   * Comprueba si el usuario está logueado:
   *     => si existe el token de usuario, está logueado
   */
  estaLogueado() {

    return ( this.token.length > 5 ) ? true : false;

  }


}
