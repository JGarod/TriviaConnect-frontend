import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SocialService } from '../../../../../services/social/social.service';
import { UsuarioByString } from '../../../../../interfaces/social/social.interface';
import { environment } from '../../../../../../environments/environment';
import { RouterLink } from "@angular/router";
import { ProfileService } from '../../../../../services/user/profile.service';
import { JwtPayload, TokenService } from '../../../../../services/token-auth/token.service';

@Component({
  selector: 'app-friends-search',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './friends-search.component.html',
  styleUrl: './friends-search.component.css'
})
export class FriendsSearchComponent {
  isSearching: boolean = false;
  // searchFilters: any[] = [
  //   { id: 'online', label: 'En línea', active: false },
  //   { id: 'highLevel', label: 'Nivel alto', active: false },
  //   { id: 'recent', label: 'Recientes', active: false }
  // ];
  commonFriends: any[] = [];
  searchQuery: string = '';
  searchResults: UsuarioByString[] = [];
  public cloudPath = environment.cloudinary_path;
  private searchSubject: Subject<string> = new Subject();
  public userData: JwtPayload | null = null;
  constructor(private socialService: SocialService, private profileService: ProfileService, private tokenService: TokenService){}
  ngOnInit() {
    // Configurar la búsqueda con debounce para evitar muchas solicitudes
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
    this.userData = this.tokenService.getUserData();
    // Cargar amigos en común
    // this.loadCommonFriends();
  }
//detecta a la hora de cambios y llama al buscador
  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string) {
    if (!query || query.length < 2) {
      this.searchResults = [];
      return;
    }

    this.isSearching = true;
    this.socialService.postSearchUser(query).subscribe({
      next: (data) => {
        let filtered = data.usuarios;
        let dataFiltered = filtered.map(element=>{
          element.avatar = `${this.cloudPath}${element.uuid_imagen}.jpg?v=${Date.now()}`;
          return element;
        })
        this.searchResults = dataFiltered;
        this.isSearching = false;
      },
      error: (err) => {
        // si el backend devuelve 400 o cualquier error
        console.log('error');
        this.isSearching = false;
      }
    });
    // Simular una llamada a API con timeout
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    // this.clearFilters();
  }

  // toggleFilter(filter: any) {
  //   filter.active = !filter.active;
  //   this.onSearchChange(); // Volver a buscar con los nuevos filtros
  // }

  // isFilterActive(id: string): boolean {
  //   const filter = this.searchFilters.find(f => f.id === id);
  //   return filter ? filter.active : false;
  // }

  // clearFilters() {
  //   this.searchFilters.forEach(filter => filter.active = false);
  // }

  // getFilterClass(filter: any): string {
  //   const baseClass = "px-3 py-1 rounded-full text-xs transition-colors duration-200";
  //   return filter.active ?
  //     `${baseClass} bg-blue-100 text-blue-700 border border-blue-300` :
  //     `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  // }

  // sendFriendRequest(user: any) {
  //   if (!user.isFriend && !user.requestSent) {
  //     user.requestSent = true;

  //     // Aquí iría la lógica para enviar la solicitud de amistad al servidor
  //     console.log(`Solicitud enviada a ${user.name}`);
  //   }
  // }

  sendFriendRequest(estado: string, user: UsuarioByString) {
    try {
      // console.log(user);
      const formData = {
        id_usuario: user.id_usuario,
        estado: estado
      };
      console.log(formData);
      this.profileService.postAgregarUsuario(formData).subscribe({
        next: (res) => {
          console.log('res', res);
         user.amistad_status = res.estado.estado_amistad
        },
        error: (err) => {


        }
      });
    } catch (error) {

    }
  }
  // loadCommonFriends() {
  //   // Simular carga de amigos en común
  //   this.commonFriends = [
  //     { id: 6, name: 'Juan Martínez', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Juan', commonFriends: 3 },
  //     { id: 7, name: 'Sofia Ramirez', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Sofia', commonFriends: 2 },
  //     { id: 8, name: 'Diego Herrera', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Diego', commonFriends: 5 }
  //   ];
  // }

  viewProfile(user: any) {
    // Navegar al perfil del usuario
    console.log(`Ver perfil de ${user.name}`);
  }
}
