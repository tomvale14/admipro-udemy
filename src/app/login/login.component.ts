import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/models/usuario.model';

// llama a la función de custom.ts
declare function init_plugins();

// liberia de Google gapi
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable para recordar el email
  email: string;

  // variable asociada a un campo del formulario: [(ngModel)]="recuerdame"
  // y valor por defecto que tomará el campo
  recuerdame: boolean = false;

  // variable para el objeto Sign-In => necesario para el token de usuario
  auth2: any;

  // necesito poder navegar desde el Router
  constructor( public router: Router,
               // => inyectar el servicio UsuarioService para poder hacer uso de él
               public _usuarioService: UsuarioService
    ) { }

  /**
   *
   */
    ngOnInit() {
    // *** INICIALIZA LOS PLUGINS CUANDO SE INICIAN LOS COMPONENTES para cargar los archivos jquery ***
    init_plugins();

    /** Llama a la función googleInit(); */
    this.googleInit();

    /** El email lo coge del Local Storege.
     *  => si es 'undefined' almacena en la variable email: ''
     */
    this.email = localStorage.getItem('email') || '';

    // => para que el checbox 'recordar' permanezca marcado
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

 /**
  * Función de inicialización del plugin de Google Sign-In.
  * La documentación se encuentra en el menú Sign-In Using Listeners de Google Sign-In.
  */
  googleInit() {

    // carga auth2
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '962943089681-mufn0taha393hcuemj9rvddmr5hn303r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // información que necesitamos de la cuenta de Google del usuario
        scope: 'profile email'
      });

      /** Llama a la función attachSignin(); */
      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  /**
   * Cuando se pulse sobre el botón de Google => se dispara el callback de Google.
   * @param element  elemento HTML al cual quiero adjuntar la información del usuario.
   */
   attachSignin( element ) {

      this.auth2.attachClickHandler( element, {}, (googleUser) => {  // googleUser es lo que se recibe del callback

        // let profile = googleUser.getBasicProfile();
        // console.log( profile );

        // TOKEN de usuario de Google
        let token = googleUser.getAuthResponse().id_token;


        /** Realiza la llamada al servicio POST del login de Google */
        //  => la respuesta es la que nosotros definimos en el servicio, NO la de Google
        this._usuarioService.loginGoogle( token )
                  // => si el usuario se ha autenticado correctamente desde Google, navega a la página 'dashboard'
                  // .subscribe( () => this.router.navigate([ '/dashboard' ]) );

                  /** Redirección a '/dashboard' MANUAL para que visualice bien la página 
                   *  => al utilizar el hash no se recarga la aplicación. 
                   */
                  .subscribe( () => window.location.href = '#/dashboard' );

        console.log( token );
      });
   }

  /**
   * Función de login de usuario
   * @param formulario 
   */
  ingresar( formulario: NgForm ) {

    if ( formulario.invalid ) {
      return;
    }

    // declaro una variable del modelo de Usuario
    let usuario = new Usuario( null, formulario.value.email, formulario.value.password );

    // llamada al servicio para el login del usuario.
    // Para que la función se dispare necesito subscribirme.
    // => devuelve la respuesta definida en el Backend Server
    // => si es usuario NO válido devuelve un ERROR POST con las credenciales incorrectas
    this._usuarioService.login( usuario, formulario.value.recuerdame )
                    .subscribe( correcto => this.router.navigate([ '/dashboard' ]) );

    // console.log(formulario.valid);
    // console.log(formulario.value);

  }

}