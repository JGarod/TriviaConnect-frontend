import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../services/user/profile.service';
import { getProfile } from '../../../interfaces/user/profile.interface';
import { TokenService } from '../../../services/token-auth/token.service';
import { EditarComponent } from './components/editar/editar.component';
import { UploadAvatarComponent } from './components/upload-avatar/upload-avatar.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, EditarComponent, UploadAvatarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public isEditing = false;
  public userPreferences = {
    color_primario: '#1E3A8A', // azul oscuro (hex)
    color_secundario: '#9333EA' ,   // morado (hex)
    acepta_solicitud_amistad:false,
  };
  public isUserCurrent = false;
  public user: getProfile = {
    nombre_usuario: 'null',
    id_usuario: 0,
    slug: '',
    avatar: null,
  };
  public slug: string = "";
  public abrirModal:boolean = false;
  public cloudPath = environment.cloudinary_path;
  public isLoading:boolean=true;
  constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService,private authService: TokenService) { }

  //cargado de usuario
  ngOnInit(): void {
    // Nos suscribimos para detectar cambios en el slug
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || "";
      this.cargadoUsuario(); // cada vez que cambia el slug, vuelve a cargar
    });
  }

  cargadoUsuario() {
    try {
      if (this.slug) {
        this.isLoading=true;
        this.profileService.getProfile(this.slug).subscribe({
          next: (data) => {
            this.user = data;
            this.userPreferences.color_primario = `#${data.color_primario}` || '#1E3A8A';
            this.userPreferences.color_secundario = `#${data.color_secundario}` || '#9333EA';
            this.userPreferences.acepta_solicitud_amistad = data.acepta_solicitud_amistad || false;
            if (this.user && this.user.uuid_imagen) {
              this.user.img = `${this.cloudPath}${this.user.uuid_imagen}.jpg?v=${Date.now()}`;
            }
            let usuarioActual = this.authService.getUserData();
            console.log(usuarioActual?.id);
            console.log(data.id_usuario);
            console.log(this.isUserCurrent);
            this.isUserCurrent = usuarioActual?.id === data.id_usuario;
            this.isLoading=false;
          },
          error: (err) => {
            // si el backend devuelve 400 o cualquier error
            this.router.navigate(['/home']);
          }
        });
      } else {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.log('error', error);
      this.router.navigate(['/home']);
    }
  

  }
  //muestra o no la vista de editar
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onAvatarUploaded(newUrl: string) {
    this.user.img = `${newUrl}?v=${Date.now()}`; // actualiza la vista
    this.abrirModal = false;   // cierra modal
  }


}
