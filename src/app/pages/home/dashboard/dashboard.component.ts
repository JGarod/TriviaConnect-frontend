import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  partidas = [
    {
      nombre: 'kevingualdron23',
      descripcion: '1 amigo en común',
      avatar: 'assets/avatar1.png'
    },
    {
      nombre: 'floria.avalos.5',
      descripcion: '#ATuNivel',
      avatar: 'assets/avatar2.png'
    }
  ];
}
