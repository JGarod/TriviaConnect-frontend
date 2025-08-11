import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './token-register.component.html',
  styleUrl: './token-register.component.css'
})
export class TokenRegisterComponent {
  public mensaje: string | null = null;
  public error: string | null = null;
  public tipo :number|null=0;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    console.log('entro');
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.validarToken(token).subscribe({
          next: (res) => {
            console.log(res);
            this.tipo = res.tipo;
            this.mensaje = res.message;
          },
          error: (err) => {
            this.tipo = 0;
            this.mensaje = 'Ha ocurrido un error!'
            this.error = err.error?.message || 'Error desconocido';
          }
        });
      } else {
        this.tipo = 0;
        this.mensaje = 'No se recibió el token.';
      }
    });
  }
}
