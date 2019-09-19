import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// importar librería sweetalert2 VERSION 2
import Swal from 'sweetalert2';

// *** Los servicios están centralizados en un único archivo ***
// import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuarioService } from '../services/service.index';
import { Usuario } from 'src/models/usuario.model';
import { Router } from '@angular/router';

// llama a la función de custom.ts
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * 1- El Two Way DataBinding es un poco más pesado para procesarlo por Angular
   *    y puede llevar a modificar información sin que tu quieras (si no tienes buen control sobre lo que haces),
   *    pero con formularios reactivos, tienes mayor control del estado completo del formulario, si es válido,
   *    inválido, validaciones asíncronas, validaciones predeterminadas, etc
   * 2- No todos los navegadores web hacen validaciones HTML por defecto,
   *    y también el usuario puede desactivarlas si lo desea en los navegadores web,
   *    por lo cual no lo hace 100% confiable, pero esta bien si lo quieres manejar por los dos lados o sólo por el lado de Angular.
   */

   // Formulario de Registro de Usuario
   formulario: FormGroup;

   constructor(
     // Inyecta el servicio UsuarioService
     // tslint:disable-next-line: variable-name
     public _usuarioService: UsuarioService,

     // Inyecta el Router para navegar a la página de login
     public router: Router
   ) { }

  /**
   * Valida si los 2 campos pasados como parámetros son iguales.
   *   => Si los campos SON IGUALES: PASA LA VALIDACIÓN => null
   *   => Si los campos SON DISTINTOS: LA CONDICIÓN NO SE CUMPLE => true
   *      ES EL ERROR QUE VA A IMPEDIR QUE EL FORMULARIO SEA VÁLIDO
   * 
   * @param campo1
   * @param campo2
   */
  sonIgualesError( campo1: string, campo2: string ) {

    return ( formGroup: FormGroup ) => {

      let pass1 = formGroup.controls[campo1].value;
      let pass2 = formGroup.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIgualesError: true
      };

    };

  }

  ngOnInit() {

    // *** INICIALIZA LOS PLUGINS CUANDO SE INICIAN LOS COMPONENTES para cargar los archivos jquery ***
    init_plugins();

    this.formulario = new FormGroup({
      // definimos los campos del formulario que despues controlaremos desde el HTML
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [ Validators.required,  Validators.email ] ),  // valor-por-defecto, array-validaciones),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )  // opcional con valor por defecto false
    }, { validators: this.sonIgualesError( 'password', 'password2' ) } );

    /** Asignación de datos para PRUEBAS */
    this.formulario.setValue({
      nombre: 'Test',
      correo:  'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  /**
   * Registra un usuario con los datos del formulario de registro
   */
  registrarUsuario() {

    // 1. antes de registrar el usuario => comprobamos si el formulario es válido
    // if ( !this.formulario.valid ) {
    if ( this.formulario.invalid ) {
      return;
    }

    // 2. compruebo si se ha seleccionado el checkbox de las condiciones
    if ( !this.formulario.value.condiciones ) {
      // console.log( 'Debe de aceptar las condiciones' );
      Swal.fire(
        'Importante',
        'Debe de aceptar las condiciones',
        'warning'
      );

      return;
    }

    console.log( 'Formulario válido: ', this.formulario.valid );

    console.log( this.formulario.value );

    // 3. Define un objeto de tipo 'Usuario' con el MODELO del USUARIO con los datos del usuario
    //    SOLAMENTE SE INICIALIZAN LOS CAMPOS OBLIGATORIOS, los opcionales los pone a null
    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    // 4. Llama a la función crearUsuario del servicio usuario.service.ts, la cual devuelve un Observable,
    //    al que tengo que subscribir para que me notifique cuando obtenga la respuesta.
    //    Esta respuesta puede ser una de las siguientes:
    //                - un objeto con los datos del usuario devueltos por la petición POST
    //                - o bien un objeto de error
    this._usuarioService.crearUsuario( usuario )
                  .subscribe( resp => this.router.navigate(['/login']));

  }

}
