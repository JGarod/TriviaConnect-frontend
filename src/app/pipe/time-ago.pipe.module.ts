import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './fromNow.pipe';

@NgModule({
    declarations: [TimeAgoPipe],
    exports: [TimeAgoPipe], // Exporta el pipe para que se pueda usar en otros lugares
    imports: [CommonModule] // Importa CommonModule para poder usar directivas como ngIf, ngFor, etc.
})
export class TimeAgoPipeModule { }
