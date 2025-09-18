import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AmigoDataProfile } from '../../../../../../models/social.models';
import { LoadingDirective } from '../../../../../directives/loading.directive';
import { environment } from '../../../../../../environments/environment';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [LoadingDirective, CommonModule, RouterModule],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.css'
})
export class FriendsListComponent {
  @Input() rFriendsData: AmigoDataProfile[] = [];
  @Input() rIsLoading: boolean = false;
  public cloudPath = environment.cloudinary_path;
  public rFriendsDataPublic?: AmigoDataProfile[];
  public numberAmigos:number = 0;
    ngOnChanges(changes: SimpleChanges) {
       if (changes['rFriendsData'] && this.rFriendsData) {
         this.loadData();
       }
     }

  loadData() {
    if (this.rFriendsData && this.rFriendsData.length > 0) {
      this.rFriendsDataPublic = this.rFriendsData
        .slice(0, 4) // máximo 4 amigos
        .map(friend => ({
          ...friend,
          img: friend.uuid_imagen
            ? `${this.cloudPath}${friend.uuid_imagen}.jpg?v=${Date.now()}`
            : 'ruta/a/imagen_por_defecto.jpg'
        }));
    }
  }

}
