import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiResponse, IRegistro } from '../../../interfaces/auth/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,        
    ReactiveFormsModule, 
    FormsModule,        
    RouterModule        
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  public mensaje:string='';

  public registroForm: FormGroup = this.fb.group(
    {
      nombre_usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordUno: ['', Validators.required],
      passwordDos: ['', Validators.required]
    },
    { validators: this.passwordsCoinciden }
  );

  constructor(private authService: AuthService) { }
  //validar si las 2 contraseñas coinciden
  private passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('passwordUno')?.value;
    const pass2 = group.get('passwordDos')?.value;
    return pass1 && pass2 && pass1 !== pass2 ? { passwordMismatch: true } : null;
  }

  //boton donde se hace la solicitud
  public onSubmit(): void {
    if (this.registroForm.valid) {
      let formData: IRegistro = {
        nombre_usuario: this.registroForm.value.nombre_usuario,
        email: this.registroForm.value.email,
        passwordUno: this.registroForm.value.passwordUno,
        passwordDos: this.registroForm.value.passwordDos,
      }
      this.authService.registrarUsuario(formData).subscribe({
        next: (res: ApiResponse) => {
          this.mensaje = res.message;
          // this.errores = res.detalles || [];
        },
        error: (err: ApiResponse) => {
          this.mensaje = err.message;
          // this.errores = err.detalles || [];
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
