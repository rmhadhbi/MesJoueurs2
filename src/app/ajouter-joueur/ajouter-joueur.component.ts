import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-ajouter-joueur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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
    this.joueurService.listePostes().subscribe({
      next: (posts) => {
        if (posts && posts._embedded && posts._embedded.postes) {
          this.postes = posts._embedded.postes;
        } else if (Array.isArray(posts)) {
          this.postes = posts;
        }
        if (this.postes.length > 0) {
          this.newIdPoste = this.postes[0].idPoste!;
        }
      },
      error: (err) => {
        console.error("Erreur chargement postes", err);
      }
    });
  }

  addJoueur(): void {
    this.newJoueurs.poste = this.postes.find(p => p.idPoste == this.newIdPoste);
    this.joueurService.ajouterJoueur(this.newJoueurs).subscribe({
      next: (j) => {
        console.log("Joueur ajouté avec succès:", j);
        this.router.navigate(['/joueurs']);
      },
      error: (err) => {
        console.error("Erreur ajout joueur", err);
        this.router.navigate(['/joueurs']);
      }
    });
  }
}
