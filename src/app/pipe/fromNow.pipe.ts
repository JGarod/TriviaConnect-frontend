import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
    name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: any): string {
        return formatDistanceToNow(new Date(value), { addSuffix: true, locale: es });
    }
}
