import { Component } from '@angular/core';
import { TokenService } from '../../services/token-auth/token.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userData: any = null;

  constructor(private authService: TokenService) { }

  ngOnInit() {
    this.userData = this.authService.getUserData();
    console.log(this.userData);
  }

  logout(){
    this.userData = this.authService.logout();
  }
}
