import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sugerencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sugerencias.component.html',
  styleUrl: './sugerencias.component.css'
})
export class SugerenciasComponent {
  suggestions = [
    { name: 'Laura Torres', email: 'laura@example.com', reason: 'Prurba' },
    { name: 'Mario Gómez', email: 'mario@example.com', reason: 'Prurba' },
    // ...
  ];
}
