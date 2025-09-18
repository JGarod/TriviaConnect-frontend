import { Component, model } from '@angular/core';
import { NavigationItem } from '../../home.component';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../../services/token-auth/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public rnavigationItems = model<NavigationItem[]>([]);
  public rsidebarMinimizado = model<boolean>();


  constructor(private authService: TokenService) { }

  ngOnInit() {
    // Recuperar el valor guardado en localStorage
    const saved = localStorage.getItem('sidebarMinimizado');
    if (saved !== null) {
      this.rsidebarMinimizado.set(saved === 'true'); // Convierte string a boolean
    }
  }

  toggleSidebar() {
    const newValue = !this.rsidebarMinimizado();
    this.rsidebarMinimizado.set(newValue);

    // Guardar el nuevo valor en localStorage
    localStorage.setItem('sidebarMinimizado', String(newValue));
  }

  logout() {
    this.authService.logout();
  }
}
