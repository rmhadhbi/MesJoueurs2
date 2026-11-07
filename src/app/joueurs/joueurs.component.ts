import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-joueurs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit {

  joueurs: Joueur[] = [];
  postes: Poste[] = [];
  newJoueurs = new Joueur();
  newIdPoste!: number;
  newPoste!: Poste;
  showForm = false;

  constructor(
    private joueurService: JoueurService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.joueurs = this.joueurService.listeJoueurs();
    this.postes = this.joueurService.listePostes();
    this.newIdPoste = this.postes[0].idPoste!;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newJoueurs = new Joueur();
    this.newIdPoste = this.postes[0].idPoste!;
  }

  addJoueur(): void {
    this.newPoste = this.joueurService.consulterPoste(this.newIdPoste);
    this.newJoueurs.poste = this.newPoste;
    this.joueurService.ajouterJoueur(this.newJoueurs);
    this.joueurs = this.joueurService.listeJoueurs();
    this.newJoueurs = new Joueur();
    this.newIdPoste = this.postes[0].idPoste!;
    this.showForm = false;
  }

  supprimerJoueur(j: Joueur): void {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.joueurService.supprimerJoueur(j);
    }
  }
}
