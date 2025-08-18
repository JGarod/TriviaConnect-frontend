// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, IRegistro } from '../../interfaces/auth/auth.interface';

interface ValidarTokenResponse {
  message: string;
  tipo: number | null;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //registar el ususario en la db
  registrarUsuario(datos: IRegistro): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/register`, datos)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            return throwError(() => error.error as ApiResponse);
          }
          return throwError(() => ({ message: 'Error desconocido' } as ApiResponse));
        })
      );
  }
  //valida el token de registro
  validarToken(token: string): Observable<ValidarTokenResponse> {
    return this.http.post<ValidarTokenResponse>(`${this.apiUrl}/auth/verificarRegistro`, { token });
  }
  //reenvia un correo al registrarse
  reenviarCorreo(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/reenviarCorreoRegistro`, { email })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            return throwError(() => error.error as ApiResponse);
          }
          return throwError(() => ({ message: 'Error desconocido' } as ApiResponse));
        })
      );
  }
  //renvia corrreo con nuevo token
  correoNewToken(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/reenviarToken`, { email })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error && error.error.message) {
            return throwError(() => error.error as ApiResponse);
          }
          return throwError(() => ({ message: 'Error desconocido' } as ApiResponse));
        })
      );
  }
}
