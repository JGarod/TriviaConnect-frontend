import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../services/user/profile.service';
import { preferencesUser } from '../../../../../interfaces/user/profile.interface';
import { SpinnerService } from '../../../../../services/shared/spinner/spinner.service';

@Component({
  selector: 'app-preferencias',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.css'
})
export class PreferenciasComponent {
  public mensaje: string = "";
  public isLoading: boolean = false;
  public preferencesForm!: FormGroup;
  public defaultPrimaryColor = '#6366f1';
  public defaultSecondaryColor = '#ec4899';
  @Input() rPreferences!: preferencesUser;
  @Output() preferencesUpdated = new EventEmitter<preferencesUser>();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private spinnerService: SpinnerService
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
    this.initializeForm();
  }

  //crear el formulario y asignarle los colores y los datos
  private initializeForm(): void {
    this.defaultPrimaryColor = this.rPreferences.color_primario;
    this.defaultSecondaryColor = this.rPreferences.color_secundario;
    this.preferencesForm = this.fb.group({
      aceptarSolicitudes: [this.rPreferences.acepta_solicitud_amistad],
      colorPrimario: [this.defaultPrimaryColor, Validators.required],
      colorSecundario: [this.defaultSecondaryColor, Validators.required]
    });
    this.isLoading = false;
  }

  //asigna el tipo de solicitud si acepta o no
  onSwitchChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.preferencesForm.get('aceptarSolicitudes')?.setValue(isChecked);
  }
  //obtiene el color
  getPrimaryGradient(): string {
    const color = this.preferencesForm.get('colorPrimario')?.value || this.defaultPrimaryColor;
    const lighterColor = this.lightenColor(color, 20);
    return `linear-gradient(135deg, ${color}, ${lighterColor})`;
  }

  //obtiene el color
  getSecondaryGradient(): string {
    const color = this.preferencesForm.get('colorSecundario')?.value || this.defaultSecondaryColor;
    const lighterColor = this.lightenColor(color, 20);
    return `linear-gradient(135deg, ${color}, ${lighterColor})`;
  }
  //agarra el hexa y lo entrega
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return "#" + (0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  }


  async onSubmit(): Promise<void> {
    if (this.preferencesForm.valid) {
      try {
        this.mensaje = '';
        this.spinnerService.show();
        const formData: preferencesUser = {
          acepta_solicitud_amistad: this.preferencesForm.get('aceptarSolicitudes')?.value,
          color_primario: this.preferencesForm.get('colorPrimario')?.value,
          color_secundario: this.preferencesForm.get('colorSecundario')?.value
        };
        this.profileService.postPreferencesUser(formData).subscribe({
          next: (res) => {
            this.preferencesUpdated.emit(formData);
            this.spinnerService.hide();
            this.mensaje = res.message;
          },
          error: (err) => {
            this.spinnerService.hide();
            this.mensaje = err.message
            console.error('Error al actualizar el perfil:', err);
          }
        });
        console.log('Formulario enviado:', formData);
      } catch (error) {
        console.error('Error al guardar preferencias:', error);
        // Aquí podrías mostrar un mensaje de error
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
