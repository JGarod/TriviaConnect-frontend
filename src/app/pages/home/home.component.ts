import { Component, HostListener } from '@angular/core';
import { TokenService } from '../../services/token-auth/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppMobileComponent } from './components/app-mobile/app-mobile.component';


export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  id: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, AppMobileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public userData: any = null;
  public showUserDropdown = false;
  public sidebarMinimizado = false;

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
    this.userData = this.authService.getUserData();
    console.log(this.userData);
  }

  logout(){
    this.userData = this.authService.logout();
  }




  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }


  // Cerrar dropdowns/modales al hacer click fuera
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: Event) {
  //   const target = event.target as HTMLElement;
  //   const dropdown = document.querySelector('[data-dropdown]');

  //   if (dropdown && !dropdown.contains(target)) {
  //     this.closeUserDropdown();
  //   }
  // }

  // Cerrar modal móvil con tecla Escape

}
