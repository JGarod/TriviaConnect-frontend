import { Component, Input, SimpleChanges } from '@angular/core';
import { UserDataProfile } from '../../../../../../models/social.models';
import { LoadingDirective } from '../../../../../directives/loading.directive';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [LoadingDirective,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
@Input() rUserData!: UserDataProfile;
  @Input() rIsLoading:boolean =false;
  public cloudPath = environment.cloudinary_path;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['rUserData'] && this.rUserData) {
      this.loadData();
    }
  }

  loadData() {
    this.rUserData.img = `${this.cloudPath}${this.rUserData.uuid_imagen}.jpg?v=${Date.now()}`;
  }

}
