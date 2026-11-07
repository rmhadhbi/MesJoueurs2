import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-ajouter-joueur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-joueur.component.html',
  styleUrls: ['./ajouter-joueur.component.css']
})
export class AjouterJoueurComponent implements OnInit {

  newJoueurs = new Joueur();
  postes: Poste[] = [];
  newIdPoste!: number;

  constructor(
    private joueurService: JoueurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postes = this.joueurService.listePostes();
    if (this.postes.length > 0) {
      this.newIdPoste = this.postes[0].idPoste!;
    }
  }

  addJoueur(): void {
    this.newJoueurs.poste = this.joueurService.consulterPoste(this.newIdPoste);
    this.joueurService.ajouterJoueur(this.newJoueurs);
    this.newJoueurs = new Joueur();
    this.router.navigate(['/joueurs']);  
  }
}
