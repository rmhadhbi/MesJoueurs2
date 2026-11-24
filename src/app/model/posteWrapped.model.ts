import { Poste } from './poste.model';

export class PosteWrapper {
  _embedded!: { postes: Poste[] };
}
