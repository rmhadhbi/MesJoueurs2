import { Injectable } from '@angular/core';
import { Joueur } from './model/Joueurs.model';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  joueurs: Joueur[];

  constructor() {
    this.joueurs = [
      { cin: 11223344, nomJoueur: 'Messi', prenomJoueur: 'Lionel', equipeInstant: 'Inter Miami', dateMercato: new Date('2023-07-15') },
      { cin: 22334455, nomJoueur: 'Ronaldo', prenomJoueur: 'Cristiano', equipeInstant: 'Al Nassr', dateMercato: new Date('2023-01-01') },
      { cin: 33445566, nomJoueur: 'Neymar', prenomJoueur: 'Jr', equipeInstant: 'Al Hilal', dateMercato: new Date('2023-08-15') }
    ];
  }

  listeJoueurs(): Joueur[] {
    return this.joueurs;
  }

  ajouterJoueur(j: Joueur) {
    this.joueurs.push(j);
  }
}