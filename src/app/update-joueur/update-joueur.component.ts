import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Joueur } from '../model/Joueurs.model';
import { JoueurService } from '../joueur.service';

@Component({
  selector: 'app-update-joueur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-joueur.component.html'
})
export class UpdateJoueurComponent implements OnInit {

  currentJoueur = new Joueur();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private joueurService: JoueurService
  ) {}

  ngOnInit(): void {
    this.currentJoueur = this.joueurService.consulterJoueur(
      Number(this.activatedRoute.snapshot.params['id'])
    );
  }

  updateJoueur(): void {
    this.joueurService.updateJoueur(this.currentJoueur);
    this.router.navigate(['joueurs']);
  }
}