import { Injectable } from '@angular/core';
import { Joueur } from './model/Joueurs.model';
import { Poste } from './model/poste.model';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  joueurs: Joueur[];
  postes: Poste[];

  constructor() {
    this.postes = [
      { idPoste: 1, nomPoste: 'Gardien' },
      { idPoste: 2, nomPoste: 'Défenseur' },
      { idPoste: 3, nomPoste: 'Milieu' },
      { idPoste: 4, nomPoste: 'Attaquant' }
    ];

    this.joueurs = [
      { cin: 11223344, nomJoueur: 'Messi', prenomJoueur: 'Lionel', equipeInstant: 'Inter Miami', dateMercato: new Date('2023-07-15'), poste: { idPoste: 4, nomPoste: 'Attaquant' } },
      { cin: 22334455, nomJoueur: 'Ronaldo', prenomJoueur: 'Cristiano', equipeInstant: 'Al Nassr', dateMercato: new Date('2023-01-01'), poste: { idPoste: 4, nomPoste: 'Attaquant' } },
      { cin: 33445566, nomJoueur: 'Neymar', prenomJoueur: 'Jr', equipeInstant: 'Al Hilal', dateMercato: new Date('2023-08-15'), poste: { idPoste: 3, nomPoste: 'Milieu' } }
    ];
  }

  listeJoueurs(): Joueur[] {
    return this.joueurs;
  }

  ajouterJoueur(j: Joueur) {
    this.joueurs.push(j);
  }

  supprimerJoueur(j: Joueur) {
    const index = this.joueurs.indexOf(j, 0);
    if (index > -1) {
      this.joueurs.splice(index, 1);
    }
  }

  consulterJoueur(cin: number): Joueur {
    return this.joueurs.find(j => j.cin === cin)!;
  }

  updateJoueur(j: Joueur) {
    const index = this.joueurs.indexOf(j, 0);
    if (index > -1) {
      this.joueurs.splice(index, 1);
      this.joueurs.splice(index, 0, j);
    }
  }

  listePostes(): Poste[] {
    return this.postes;
  }

  consulterPoste(id: number): Poste {
    return this.postes.find(p => p.idPoste == id)!;
  }

  ajouterPoste(p: Poste): Poste {
    if (!p.idPoste || p.idPoste === 0) {
      const maxId = this.postes.length > 0 ? Math.max(...this.postes.map(post => post.idPoste ?? 0)) : 0;
      p.idPoste = maxId + 1;
    }
    this.postes.push({ ...p });
    return p;
  }

  updatePoste(p: Poste) {
    const index = this.postes.findIndex(post => post.idPoste == p.idPoste);
    if (index > -1) {
      this.postes[index] = { ...p };
      this.joueurs.forEach(j => {
        if (j.poste && j.poste.idPoste == p.idPoste) {
          j.poste.nomPoste = p.nomPoste;
        }
      });
    }
  }

  supprimerPoste(p: Poste) {
    const index = this.postes.indexOf(p, 0);
    if (index > -1) {
      this.postes.splice(index, 1);
    }
  }


  rechercherParPoste(idPoste: number): Joueur[] {
    if (!idPoste) {
      return this.joueurs;                 // 0 = tous les postes
    }
    return this.joueurs.filter(j => j.poste?.idPoste == idPoste);
  }
}