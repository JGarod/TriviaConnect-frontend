import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProfileService } from '../../../../../services/user/profile.service';
import { SpinnerService } from '../../../../../services/shared/spinner/spinner.service';

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './seguridad.component.html',
  styleUrl: './seguridad.component.css'
})
export class SeguridadComponent {
  public securityForm!: FormGroup;
  public mensaje: string = "";
  public isLoading: boolean = false;
  public passwordVisible :boolean = false;
  public passwordUnoVisible :boolean = false;
  public passwordDosVisible :boolean = false;
  public abrirModal :boolean = false;
  constructor(private fb: FormBuilder, private profileService: ProfileService,private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cargadoPerfil();
  }

  async cargadoPerfil() {
    try {

      this.securityForm = this.fb.group({
        password: ['', Validators.required],
        passwordUno: ['', Validators.required],
        passwordDos: ['', Validators.required],
      }, {
        validators: [this.passwordsCoinciden, this.passwordActualValidacion]
      });

      this.isLoading = false;

    } catch (error) {

    }
  }

//abre el modal para confirmar el cambio
  async validarData(){
    if (this.securityForm.valid) {
      this.abrirModal=true;
    }
  }
 //guardar cambios de la clave
  async saveChanges() {
   try {
     this.spinnerService.show();
     this.profileService.postChangePassword(this.securityForm.value).subscribe({
       next: () => {
         this.spinnerService.hide();
       },
       error: (err) => {
         this.abrirModal = false;
         this.spinnerService.hide();
         this.mensaje = err.message
         console.error('Error al actualizar el perfil:', err);
       }
     });
   } catch (error) {
    
   }
  }
  


  togglePasswordVisibility(passwordField: string): void {
    if (passwordField === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (passwordField === 'passwordUno') {
      this.passwordUnoVisible = !this.passwordUnoVisible;
    } else if (passwordField === 'passwordDos') {
      this.passwordDosVisible = !this.passwordDosVisible;
    }
  }

  //validar si la clave es la misma para los 2 campos
  private passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('passwordUno')?.value;
    const pass2 = group.get('passwordDos')?.value;
    return pass1 && pass2 && pass1 !== pass2 ? { passwordMismatch: true } : null;
  }



  //validar que la clave anterior no sea igual a la nueva
  private passwordActualValidacion(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;    // Contraseña vieja
    const pass1 = group.get('passwordUno')?.value; // Nueva contraseña 1
    const pass2 = group.get('passwordDos')?.value; // Nueva contraseña 2

    // Verificar si la contraseña vieja coincide con alguna de las nuevas contraseñas
    if (pass && (pass === pass1 || pass === pass2)) {
      return { passWordEqual: true }; // Si coincide, devolver el error
    }
    return null; // Si no hay coincidencia, no hay error
  }
  

}
