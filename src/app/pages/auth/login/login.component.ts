import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../services/token-auth/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  public isLoading: boolean = false;
  public mensaje: string = '';
  public loginForm: FormGroup = this.fb.group(
    {
      nombre_usuario: ['', Validators.required],
      password: ['', Validators.required],
    }
  );
  constructor(
    private authService: TokenService,
    private router: Router
  ) { }
  //hace la peticion de logueo
  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    const { nombre_usuario, password } = this.loginForm.value;

    this.authService.login(nombre_usuario, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        this.mensaje = err.error.message;
      }
    });
  }
}
