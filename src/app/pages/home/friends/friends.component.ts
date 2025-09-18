import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { LogrosComponent } from './components/logros/logros.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SugerenciasComponent } from './components/sugerencias/sugerencias.component';
import { SocialService } from '../../../services/social/social.service';
import { AmigoDataProfile, UserDataProfile } from '../../../../models/social.models';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FriendsSearchComponent, FriendsListComponent, EstadisticasComponent, LogrosComponent, ActividadComponent, PerfilComponent, SugerenciasComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  public isMobile = false;
  public activeTab: 'main' | 'friends' = 'main';  // valores permitidos
  public userData!: UserDataProfile;
  public FriendsData!: AmigoDataProfile[];
  public Cargando: boolean = false;
  constructor(private socialService: SocialService) { }
  ngOnInit() {
    this.checkViewport();
    this.cargadoDatos();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobile = window.innerWidth < 768;
  }

  cargadoDatos() {
    this.Cargando = true;
    this.socialService.getProfile().subscribe({
      next: (data) => {
        this.FriendsData = data.data.amigos;
        this.userData = data.data.user;
        setTimeout(() => {

          this.Cargando = false;
        }, 2000);
        // console.log(data);
      },
      error: (err) => {
        // si el backend devuelve 400 o cualquier error
        console.log('error');
      }
    });
  }
}
