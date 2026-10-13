import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-ajouter-joueur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-joueur.component.html',
  styleUrls: ['./ajouter-joueur.component.css']
})
export class AjouterJoueurComponent {

  newJoueurs = new Joueur();

  constructor(
    private joueurService: JoueurService,
    private router: Router
  ) {}

  addJoueur(): void {
    this.joueurService.ajouterJoueur(this.newJoueurs);
    this.newJoueurs = new Joueur();
    this.router.navigate(['/joueurs']);  
  }
}