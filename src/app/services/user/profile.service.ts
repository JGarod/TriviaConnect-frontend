import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token-auth/token.service';
import {  getImgUser, getPrivateProfile, getProfile, PrivateProfileResponse, ProfileResponse, receiveUpdateBasic, sendChangePassword, sendUpdateBasic } from '../../interfaces/user/profile.interface';
import { ErrorResponse } from '../../interfaces/shared/errorResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  //traer la informaicon publica de un usuario por slug
  getProfile(slug: string): Observable<getProfile> {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );
  
    return this.http.get<ProfileResponse>(`${this.baseUrl}/profile/view/${slug}`, { headers }).pipe(
      map((res: ProfileResponse) => res.existe), // 🚀 solo devuelve el usuario
      catchError(err => {
        const error = err.error as ErrorResponse;
        return throwError(() => new Error(error.message || 'Error inesperado'));
      })
    );
  }

//subir la foto de perfil 
  uploadAvatar(file: File): Observable<getImgUser> {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<getImgUser>(`${this.baseUrl}/profile/edit/upload-profile`, formData, { headers });
  }

  //traer la informaicon privada de un usuario por id
  getProfileEdit(): Observable<getPrivateProfile> {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );

    return this.http.get<PrivateProfileResponse>(`${this.baseUrl}/profile/viewPrivate`, { headers }).pipe(
      map((res: PrivateProfileResponse) => res.existe), // 🚀 solo devuelve el usuario
      catchError(err => {
        const error = err.error as ErrorResponse;
        return throwError(() => new Error(error.message || 'Error inesperado'));
      })
    );
  }

//ENVIAR LOS DATOS BASICOS DEL USUARIO
  postProfileData(data: sendUpdateBasic): Observable<receiveUpdateBasic> {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );

    return this.http.post<receiveUpdateBasic>(`${this.baseUrl}/profile/edit/datos-basicos`, data, { headers }).pipe(
      map((response: receiveUpdateBasic) => {
        this.tokenService.saveToken(response.token);
        return response; // Puedes modificar esto según lo que la API responda
      }),
      catchError(err => {
        const error = err.error as ErrorResponse;
        return throwError(() => new Error(error.message || 'Error inesperado'));
      })
    );
  }

  //ENVIAR LA SOLICITUD DE CAMBIO DE CLAVE
  postChangePassword(data: sendChangePassword): Observable<any> {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders(
      token ? { Authorization: `Bearer ${token}` } : {}
    );

    return this.http.post<any>(`${this.baseUrl}/profile/edit/password-user`, data, { headers }).pipe(
      map((response: any) => {
        this.tokenService.logout();
        return response; // Puedes modificar esto según lo que la API responda
      }),
      catchError(err => {
        const error = err.error as ErrorResponse;
        return throwError(() => new Error(error.message || 'Error inesperado'));
      })
    );
  }
}
