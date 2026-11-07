import { Routes } from '@angular/router';
import { JoueursComponent } from './joueurs/joueurs.component';
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component';
import { UpdateJoueurComponent } from './update-joueur/update-joueur.component';
import { RechercheParPosteComponent } from './recherche-par-poste/recherche-par-poste.component';
import { RechercheParEquipeComponent } from './recherche-par-equipe/recherche-par-equipe.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { joueurGuard } from './joueur.guard';

export const routes: Routes = [
  { path: 'joueurs', component: JoueursComponent },
  { path: 'add-joueur', component: AjouterJoueurComponent, canActivate: [joueurGuard] },
  { path: 'updateJoueur/:id', component: UpdateJoueurComponent, canActivate: [joueurGuard] },
  { path: 'rechercheParPoste', component: RechercheParPosteComponent },
  { path: 'rechercheParEquipe', component: RechercheParEquipeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'joueurs', pathMatch: 'full' }
];
