import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NavigationItem } from '../../home.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  showMobileUserMenu = false;
  showUserDropdown = false;

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
}
