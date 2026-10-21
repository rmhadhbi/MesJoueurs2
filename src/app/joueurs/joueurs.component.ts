import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-joueurs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit {

  joueurs: Joueur[] = [];
  newJoueurs = new Joueur();
  showForm = false;

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    this.joueurs = this.joueurService.listeJoueurs();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.newJoueurs = new Joueur();
  }

  addJoueur(): void {
    this.joueurService.ajouterJoueur(this.newJoueurs);
    this.joueurs = this.joueurService.listeJoueurs();
    this.newJoueurs = new Joueur();
    this.showForm = false;
  }

  supprimerJoueur(j: Joueur): void {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.joueurService.supprimerJoueur(j);
    }
  }
}