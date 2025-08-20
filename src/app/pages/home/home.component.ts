import { Component, HostListener } from '@angular/core';
import { JwtPayload, TokenService } from '../../services/token-auth/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppMobileComponent } from './components/app-mobile/app-mobile.component';
import { NavArribaComponent } from './components/nav-arriba/nav-arriba.component';
import { environment } from '../../../environments/environment';


export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  id: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, AppMobileComponent, NavArribaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public userData: JwtPayload | null = null;
  public sidebarMinimizado = false;
  public isMobile: boolean = false;
  public cloudPath = environment.cloudinary_path;

  public navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      id: 'friends',
      label: 'Amigos',
      route: '/friends',
      icon: 'people'
    },
    {
      id: 'rooms',
      label: 'Salas',
      route: '/rooms',
      icon: 'meeting_room'
    },
    {
      id: 'chat',
      label: 'Chat',
      route: '/chat',
      icon: 'chat'
    }
  ];
  constructor(private authService: TokenService) { }

  ngOnInit() {
    this.validarUsuario();
    this.checkScreen();
    window.addEventListener('resize', () => this.checkScreen());
    // console.log(this.userData);
  }

  validarUsuario() {
    this.userData = this.authService.getUserData();
    if (!this.userData) {
      this.logout();
    } else {
      this.userData.img = `${this.cloudPath}${this.userData.uuid_imagen}.jpg?v=${Date.now()}`;;
    }
  }
  //cerrar sesión
  logout(){
    this.userData = this.authService.logout();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreen();
  }

  private checkScreen() {
    this.isMobile = window.matchMedia('(max-width: 1023px)').matches;
  }


}
