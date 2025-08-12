import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ApiResponse, IRegistro } from '../../../interfaces/auth/auth.interface';
import { NotyfService } from '../../../services/shared/notyf.service';

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
  public mensaje: string = '';
  public isLoading: boolean = false;
  public email: string = 'garode01@gmail.com';
  public estado: string = 'Registro';

  public registroForm: FormGroup = this.fb.group(
    {
      nombre_usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordUno: ['', Validators.required],
      passwordDos: ['', Validators.required]
    },
    { validators: this.passwordsCoinciden }
  );

  constructor(private authService: AuthService,
    private notyfService: NotyfService
  ) { }
  //validar si las 2 contraseñas coinciden
  private passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('passwordUno')?.value;
    const pass2 = group.get('passwordDos')?.value;
    return pass1 && pass2 && pass1 !== pass2 ? { passwordMismatch: true } : null;
  }

  //boton donde se hace la solicitud
  public onSubmit(): void {
    if (this.registroForm.valid) {
      this.isLoading = true;
      let formData: IRegistro = {
        nombre_usuario: this.registroForm.value.nombre_usuario,
        email: this.registroForm.value.email,
        passwordUno: this.registroForm.value.passwordUno,
        passwordDos: this.registroForm.value.passwordDos,
      }
      this.authService.registrarUsuario(formData).subscribe({
        next: (res: ApiResponse) => {
          this.isLoading = false;
          this.mensaje = res.message;
          this.registroForm.reset();
          this.email = formData.email;
          this.estado = 'Verificacion'

          // this.errores = res.detalles || [];
        },
        error: (err: ApiResponse) => {
          this.isLoading = false;
          this.mensaje = err.message;
          // this.errores = err.detalles || [];
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  //reenviar Correo
  public reenviarCorreo() {
    this.authService.reenviarCorreo(this.email).subscribe({
      next: (res: ApiResponse) => {
        this.notyfService.success(res.message);

      },
      error: (err: ApiResponse) => {
        this.notyfService.error(err.message);
      }
    });
  }
}
