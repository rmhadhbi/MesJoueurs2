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
  idPoste = 0;                             // 0 = tous les postes

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    this.postes = this.joueurService.listePostes();
    this.joueurs = this.joueurService.listeJoueurs();
  }

  onChange(): void {
    this.joueurs = this.joueurService.rechercherParPoste(this.idPoste);
  }
}