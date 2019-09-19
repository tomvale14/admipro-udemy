import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// ==============================================================
//   Definimos las RUTAS PRINCIPALES
// ==============================================================

const appRoutes: Routes = [
    // {
    //     path: '',
    //     component: PagesComponent,                    // Página Principal
    //     children: [                                   // router-outlet de las páginas hijas de pages.component
    //         { path: 'dashboard', component: DashboardComponent },
    //         { path: 'progress', component: ProgessComponent },
    //         { path: 'graficas1', component: Graficas1Component },
    //         { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    //     ]
    // },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];

// forRoot son router-outlet principales
// Posteriormente se importa en app.module.ts
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
