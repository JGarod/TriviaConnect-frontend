// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TokenRegisterComponent } from './pages/auth/token-register/token-register.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verificar', component: TokenRegisterComponent },
    { path: '**', redirectTo: 'login' } // para rutas no existentes
];
