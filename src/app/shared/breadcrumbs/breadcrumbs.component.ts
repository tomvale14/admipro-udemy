import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {

      // creo una suscripción al observable que devuelve el router.events
      this.getDatosRoute().subscribe( datos => {

              // console.log( datos );

              // 1. Titulo de la página html y del breadcumbs
              this.titulo = datos.titulo;

              // 2. Titulo de la PESTAÑA DE LA PAGINA
              this.title.setTitle( this.titulo );

              // 3. Creo una DEFINICION de un METATAG para modificar el metatag 'description' de las páginas HTML
              const metaTag: MetaDefinition = {
                name: 'description',
                content: this.titulo
              };

              this.meta.updateTag( metaTag );    // modifica el metatag 'description' del elemento <head>

          });
  }

  ngOnInit() {
  }

  /**
   * Función que devuelve un observable con los datos del Route que yo quiero obtener,
   * para ello aplica los filtros de los operadores pipe y map.
   */
  getDatosRoute() {
    return this.router.events.pipe(
      // el operador filter recibe un evento
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }

}
