import { Routes } from '@angular/router';
import { JoueursComponent } from './joueurs/joueurs.component';
import { UpdateJoueurComponent } from './update-joueur/update-joueur.component';
import { RechercheParPosteComponent } from './recherche-par-poste/recherche-par-poste.component';
import { RechercheParEquipeComponent } from './recherche-par-equipe/recherche-par-equipe.component';

export const routes: Routes = [
  { path: 'joueurs', component: JoueursComponent },
  { path: 'updateJoueur/:id', component: UpdateJoueurComponent },
  { path: 'rechercheParPoste', component: RechercheParPosteComponent },
  { path: 'rechercheParEquipe', component: RechercheParEquipeComponent },
  { path: '', redirectTo: 'joueurs', pathMatch: 'full' }
];