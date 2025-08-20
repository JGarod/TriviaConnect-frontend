import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../../../../services/shared/spinner/spinner.service';
import { TokenService } from '../../../../../services/token-auth/token.service';
import { ProfileService } from '../../../../../services/user/profile.service';
import { Router } from '@angular/router';
import { getPrivateProfile, sendUpdateBasic } from '../../../../../interfaces/user/profile.interface';
import { NotyfService } from '../../../../../services/shared/notyf.service';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {
  public perfilForm!: FormGroup;

  public usuario: getPrivateProfile |null=null;
  public mensaje:string="";
  public isLoading:boolean=false;
  constructor(private notyfService:NotyfService, private fb: FormBuilder,private router:Router, private profileService: ProfileService,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.cargadoPerfil();
  }
//trae la informacion privada del usuario
  async cargadoPerfil(){
    try {

      this.perfilForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
      // this.spinnerService.show();
      this.profileService.getProfileEdit().subscribe({
        next: (data) => {
          this.usuario = data;
          this.perfilForm.patchValue({
            username: this.usuario.nombre_usuario,
            email: this.usuario.email,
          })
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.router.navigate(['/home']);
        }
      });
    } catch (error) {

    }
  }

  
  savePerfil() {
    try {
      if ((this.usuario?.email === this.perfilForm.value.email) && (this.usuario?.nombre_usuario === this.perfilForm.value.username)) {
        this.mensaje = 'Usuario actualizado correctamente'
        return;
      }
      if (this.perfilForm.valid) {
        this.isLoading = true;
        let usuario: sendUpdateBasic = {
          nombre_usuario: this.perfilForm.value.username,
          email: this.perfilForm.value.email,
        }
        this.profileService.postProfileData(usuario).subscribe({
          next: (response) => {
            console.log('Perfil actualizado:', response);
            // this.notyfService.success(response.message);
            this.mensaje = response.message
            this.router.navigate(['/profile', response.slug]);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.mensaje = err.message;
            console.error('Error al actualizar el perfil:', err);
          }
        });
      }
    } catch (error) {
      
    }
  }
}
