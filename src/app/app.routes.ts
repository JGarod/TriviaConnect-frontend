// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TokenRegisterComponent } from './pages/auth/token-register/token-register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth/auth.guard';
import { guestGuard } from './guards/invitado/invitado.guard';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { FriendsComponent } from './pages/home/friends/friends.component';
import { ProfileComponent } from './pages/home/profile/profile.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'verificar', component: TokenRegisterComponent },

    {
        path: '',
        component: HomeComponent,    // Aquí cargas el layout principal (navbar, sidebar, footer...)
        canActivateChild: [authGuard], // Proteger todas las rutas hijas
        children: [
            { path: '', component: DashboardComponent },   // /  → Dashboard dentro de HomeComponent
            { path: 'friends', component: FriendsComponent },  // /perfil
            { path: 'profile/:slug', component: ProfileComponent },  // /friends
            // otras rutas hijas
        ]
    },

    { path: '**', redirectTo: 'login' }
];
