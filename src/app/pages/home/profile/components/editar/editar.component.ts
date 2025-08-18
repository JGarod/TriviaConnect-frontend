import { Component } from '@angular/core';
import { CuentaComponent } from '../cuenta/cuenta.component';
import { SeguridadComponent } from '../seguridad/seguridad.component';
import { PreferenciasComponent } from '../preferencias/preferencias.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CuentaComponent, SeguridadComponent, PreferenciasComponent,NgClass,CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  public selectedTab: string = 'personal';

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
