import { Routes } from '@angular/router';
import { JoueursComponent } from './joueurs/joueurs.component';
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component';

export const routes: Routes = [
  { path: 'joueurs', component: JoueursComponent },
  { path: 'ajouter-joueur', component: AjouterJoueurComponent },
  { path: '', redirectTo: 'joueurs', pathMatch: 'full' }
];