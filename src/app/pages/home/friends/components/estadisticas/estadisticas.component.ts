import { Component, Input, SimpleChanges } from '@angular/core';
import { LoadingDirective } from '../../../../../directives/loading.directive';
import { CommonModule } from '@angular/common';
import { AmigoDataProfile } from '../../../../../../models/social.models';

interface getStadisticas {
    friends: number | null;
  rooms: number | null;
  matches: number | null;
  weeklyProgress: number | null;
}
@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [LoadingDirective,CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {
    @Input() rIsLoading:boolean =false;
  @Input() rFriendsData: AmigoDataProfile[] = [];
  public statsData: getStadisticas = {
    friends: null,
    rooms: null,
    matches: null,
    weeklyProgress: null
  };
  
  ngOnChanges(changes: SimpleChanges) {
     if (changes['rFriendsData'] && this.rFriendsData) {
       this.loadData();
     }
   }
 
   loadData() {
     this.statsData.friends = this.rFriendsData.length || 0;
     this.statsData.rooms = 5; // ejemplo
     this.statsData.matches = 24; // ejemplo
     this.statsData.weeklyProgress = 65; // ejemplo
   }
}
