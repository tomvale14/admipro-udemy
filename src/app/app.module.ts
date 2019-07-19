import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Módulos
import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

/*
  Declarations: le dices al módulo que tipos de componentes dispone dicho módulo.

  providers: Servicios que quieres que funcionen específicamente en este módulo y sólo en ese módulo,
             como para hacer un scope o limitar si visibilidad.

  imports: Importar otros módulos a este módulo.

  exports: Qué cosas propias de este módulo quieres hacer visibles fuera del mismo.
*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],

  // Nota: los Módulos van siempre en la parte de los imports
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
