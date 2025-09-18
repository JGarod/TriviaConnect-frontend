import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from '../token-auth/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces/shared/errorResponse.interface';
import { environment } from '../../../environments/environment';
import { ActivityResponse, GetUsersByString, socialData } from '../../interfaces/social/social.interface';
import { allUserData } from '../../../models/social.models';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private baseUrl = environment.apiUrl;

  constructor(private tokenService: TokenService, private http: HttpClient) { }


    //traer la informaicon social de un usuario por id
    getProfile(): Observable<socialData> {
      const token = this.tokenService.getToken();
  
      const headers = new HttpHeaders(
        token ? { Authorization: `Bearer ${token}` } : {}
      );
  
      return this.http.get<socialData>(`${this.baseUrl}/social/getData`, { headers }).pipe(
        map(resp => {
          const data = new allUserData(
            resp.data.user,
            resp.data.amigos
          );
          return {
            data,
            message: resp.message
          };
        }),
        catchError(err => {
          const error = err.error as ErrorResponse;
          return throwError(() => new Error(error.message || 'Error inesperado'));
        })
      );
    }

//funcion para buscar un amigo
      postSearchUser(busqueda: string): Observable<GetUsersByString> {
        const token = this.tokenService.getToken();
    
        const headers = new HttpHeaders(
          token ? { Authorization: `Bearer ${token}` } : {}
        );
    
        return this.http.post<GetUsersByString>(`${this.baseUrl}/social/buscarAmigo`, {busqueda}, { headers }).pipe(
          map((response: GetUsersByString) => {
            return response;
          }),
          catchError(err => {
            const error = err.error as ErrorResponse;
            return throwError(() => new Error(error.message || 'Error inesperado'));
          })
        );
      }

      //traer el historial por paginacion o createatmas reciente
  getHistory(page: number, limit: number, lastCreatedAt?: string): Observable<ActivityResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );

    let params: any = { page, limit };
    if (lastCreatedAt) params.lastCreatedAt = lastCreatedAt;

    return this.http.get<ActivityResponse>(`${this.baseUrl}/historial`, { headers, params }).pipe(
      map(resp => {
        return {
          data: resp.data,
          total: resp.total,
          totalPages: resp.totalPages,
          lastCreatedAt: resp.lastCreatedAt,
          page: resp.page
        };
      }),
      catchError(err => {
        const error = err.error as { message?: string };
        return throwError(() => new Error(error.message || 'Error al cargar historial'));
      })
    );
  }
}
