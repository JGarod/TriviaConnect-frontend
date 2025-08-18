import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NotyfService } from '../shared/notyf.service';

export interface JwtPayload {
  id: number;
  username: string;
  exp: number;
  slug: string;
  uuid_imagen: string;
  img?: string | null;
}
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'auth-token';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private notyfService: NotyfService) { }

  //peticion de login y guarda el token 
  login(nombre_usuario: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { nombre_usuario, password })
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          let nombre_usuarioData = this.getUserData();
          this.notyfService.success(`Bienvenido ${nombre_usuarioData?.username}!`);
})
      );
  }
  //elimina el localstorage 
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('sidebarMinimizado');
    this.router.navigate(['/login']);
    this.notyfService.success('Has salido con exito');
    return null
  }

  // obtiene el token del localstorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  //saber si la sesión expiro,sdvuelve true si el token está vencido o no se puede decodificar.
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  //Devuelve true solo si el usuario está logueado y el token es válido.
  isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  //decodifica el jwt Devuelve esos datos como un objeto JwtPayload.
  getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }
//guarda el token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
