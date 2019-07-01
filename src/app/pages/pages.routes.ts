import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Graficas1Component } from './graficas1/graficas1.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,                    // Página Principal
        children: [                                   // router-outlet de las páginas hijas de pages.component
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgessComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

// forChild son router-oulet que están dentro de otros router-outlet
// Posteriormente se importa en pages.module.ts
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
