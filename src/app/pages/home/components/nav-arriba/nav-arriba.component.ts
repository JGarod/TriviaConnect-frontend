import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { JwtPayload, TokenService } from '../../../../services/token-auth/token.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-arriba',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-arriba.component.html',
  styleUrl: './nav-arriba.component.css'
})
export class NavArribaComponent {

  public showUserDropdown = false;
  // public ruserData: any = null;
  @Input() ruserData: JwtPayload | null= null;
  constructor(private authService: TokenService, private elementRef: ElementRef, private router: Router) { }


  // ngOnInit() {
  //   console.log(this.ruserData);
  // }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }

  logout() {
    this.authService.logout();
  }

  // Cerrar dropdowns/modales al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Detecta si el click fue fuera del navbar
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeUserDropdown();
    }
  }
//funcion para mandar al perfil del usuario
  irPerfil(){
    let usuario = this.authService.getUserData();
    if (usuario && usuario.slug) {
      this.router.navigate(['/profile', usuario.slug]); 
    }
  }
}
