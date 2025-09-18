import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CuentaComponent } from '../cuenta/cuenta.component';
import { SeguridadComponent } from '../seguridad/seguridad.component';
import { PreferenciasComponent } from '../preferencias/preferencias.component';
import { CommonModule, NgClass } from '@angular/common';
import { preferencesUser } from '../../../../../interfaces/user/profile.interface';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CuentaComponent, SeguridadComponent, PreferenciasComponent,NgClass,CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  public selectedTab: string = 'personal';
  @Input() editarPreferences!: preferencesUser;
  @Output() preferencesUpdated = new EventEmitter<preferencesUser>();

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
