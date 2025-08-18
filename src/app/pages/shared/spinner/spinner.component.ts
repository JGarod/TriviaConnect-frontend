import { Component } from '@angular/core';
import { SpinnerService } from '../../../services/shared/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {


  constructor(public spinnerService: SpinnerService) { }


}