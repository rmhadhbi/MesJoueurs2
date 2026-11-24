import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Joueur } from '../model/Joueurs.model';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-recherche-par-poste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-poste.component.html'
})
export class RechercheParPosteComponent implements OnInit {

  joueurs: Joueur[] = [];
  postes: Poste[] = [];
  idPoste = 0;

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    this.joueurService.listePostes().subscribe(posts => {
      this.postes = posts._embedded.postes;
    });
    this.joueurService.listeJoueurs().subscribe(joueurs => {
      this.joueurs = joueurs;
    });
  }

  onChange(): void {
    this.joueurService.rechercherParPoste(this.idPoste).subscribe(joueurs => {
      this.joueurs = joueurs;
    });
  }
}
