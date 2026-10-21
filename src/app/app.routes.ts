import { Routes } from '@angular/router';
import { JoueursComponent } from './joueurs/joueurs.component';
import { UpdateJoueurComponent } from './update-joueur/update-joueur.component';

export const routes: Routes = [
  { path: 'joueurs', component: JoueursComponent },
  { path: 'updateJoueur/:id', component: UpdateJoueurComponent },
  { path: '', redirectTo: 'joueurs', pathMatch: 'full' }
];