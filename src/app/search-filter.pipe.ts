import { Pipe, PipeTransform } from '@angular/core';
import { Joueur } from './model/Joueurs.model';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: Joueur[], filterText: string): Joueur[] {
    if (!list) {
      return [];
    }
    if (!filterText) {
      return list;                         // ken el input fergh, nraj3ou el liste kemla
    }
    return list.filter(j =>
      (j.equipeInstant ?? '').toLowerCase().includes(filterText.toLowerCase())
    );
  }
}