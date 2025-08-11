// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, IRegistro } from '../../interfaces/auth/auth.interface';

interface ValidarTokenResponse {
  message: string;
  tipo: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


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

  validarToken(token: string): Observable<ValidarTokenResponse> {
    return this.http.post<ValidarTokenResponse>(`${this.apiUrl}/auth/verificarRegistro`, { token });
  }
}
