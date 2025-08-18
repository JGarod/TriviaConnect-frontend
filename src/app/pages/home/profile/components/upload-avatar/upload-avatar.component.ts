import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NotyfService } from '../../../../../services/shared/notyf.service';
import { ProfileService } from '../../../../../services/user/profile.service';
import { SpinnerService } from '../../../../../services/shared/spinner/spinner.service';

@Component({
  selector: 'app-upload-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-avatar.component.html',
  styleUrl: './upload-avatar.component.css'
})
export class UploadAvatarComponent {
  public selectedFile: File | null = null;
  public validTypes = ['image/jpeg', 'image/png']
  public previewUrl: string | ArrayBuffer | null = null;
  public uploading = false;

  @Output() uploaded = new EventEmitter<string>(); // Para notificar a padre la nueva URL

  constructor(private notyfService: NotyfService, private profileService: ProfileService, private spinnerService: SpinnerService) { }

  //preview de la foto
  onFileSelected(event: any) {
   try {
     this.selectedFile = event.target.files[0] || null;

     ;
     // Generar preview
     if (this.selectedFile) {
       if (!this.validTypes.includes(this.selectedFile.type)) {
         this.notyfService.error('Solo se permiten imágenes JPG o PNG');
         this.selectedFile = null;
         return;
       } else {
         const reader = new FileReader();
         reader.onload = () => this.previewUrl = reader.result;
         reader.readAsDataURL(this.selectedFile);
       }
     }
   } catch (error) {
    
   }
  }

  //asigna la imagen
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      this.onFileSelected({ target: { files: [this.selectedFile] } });
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  upload() {
    try {
      this.spinnerService.show();

      
      if (this.selectedFile && this.validTypes.includes(this.selectedFile.type)) {
        this.profileService.uploadAvatar(this.selectedFile).subscribe({
          next: (res) => {
            this.uploaded.emit(res.url);
            this.spinnerService.hide();
            this.notyfService.success(res.message);
          },
          error: (err) => {
            this.spinnerService.hide();
            this.notyfService.error(err.error.message);
          }
        });
      } else {
        this.spinnerService.hide();
        this.notyfService.error('Ha ocurrido un error al subir la imagen');
      }
    } catch (error) {
      
    }
   
  }
}
