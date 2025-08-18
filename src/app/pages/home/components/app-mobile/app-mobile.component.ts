import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NavigationItem } from '../../home.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtPayload, TokenService } from '../../../../services/token-auth/token.service';

@Component({
  selector: 'app-app-mobile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './app-mobile.component.html',
  styleUrl: './app-mobile.component.css'
})
export class AppMobileComponent {
  @Input() navigationItems: NavigationItem[] = [];
  @Output() logoutClick = new EventEmitter<void>();
  @Input() ruserData: JwtPayload | null = null;

  showMobileUserMenu = false;
  showUserDropdown = false;
  constructor(private authService: TokenService, private router: Router) { }



  ngOnInit() {
    console.log(this.ruserData);
  }

  toggleMobileUserMenu() {
    this.showMobileUserMenu = !this.showMobileUserMenu;
  }

  closeMobileUserMenu() {
    this.showMobileUserMenu = false;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }

  logout() {
    this.closeMobileUserMenu();
    this.logoutClick.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.showMobileUserMenu) {
      this.closeMobileUserMenu();
    }
  }
  //ENVIA AL PERFIL DEL USUARIO 
  irPerfil() {
    try {
      let usuario = this.authService.getUserData();
      if (usuario && usuario?.slug) {
        this.closeMobileUserMenu();
        this.router.navigate(['/profile', usuario.slug]);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
