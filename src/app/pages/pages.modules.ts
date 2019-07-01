import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgessComponent } from './progess/progess.component';

/**
 * Módulo de páginas PRINCIPALES
 */

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgessComponent
    ],
    exports: [                // cuando los componentes tambien tengan que ser utilizados
        DashboardComponent,   // en otros componentes que se encuentren fuera de este módulo.
        Graficas1Component,
        ProgessComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]

})

export class PagesModule { }