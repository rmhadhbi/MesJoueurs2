import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-update-joueur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-joueur.component.html'
})
export class UpdateJoueurComponent implements OnInit {

  currentJoueur = new Joueur();
  postes: Poste[] = [];
  updatedIdPoste!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private joueurService: JoueurService
  ) {}

  ngOnInit(): void {
    this.joueurService.listePostes().subscribe(posts => {
      console.log(posts);
      this.postes = posts._embedded.postes;
    });
    this.joueurService.consulterJoueur(
      Number(this.activatedRoute.snapshot.params['id'])
    ).subscribe(j => {
      this.currentJoueur = j;
      this.updatedIdPoste = this.currentJoueur.poste?.idPoste!;
    });
  }

  updateJoueur(): void {
    this.currentJoueur.poste = this.postes.find(p => p.idPoste == this.updatedIdPoste);
    this.joueurService.updateJoueur(this.currentJoueur).subscribe(j => {
      this.router.navigate(['joueurs']);
    });
  }
}
