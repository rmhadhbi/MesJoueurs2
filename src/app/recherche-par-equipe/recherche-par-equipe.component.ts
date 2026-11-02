import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Joueur } from '../model/Joueurs.model';
import { JoueurService } from '../joueur.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-equipe',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-equipe.component.html'
})
export class RechercheParEquipeComponent implements OnInit {

  joueurs: Joueur[] = [];
  searchTerm = '';

  constructor(private joueurService: JoueurService) {}

  ngOnInit(): void {
    this.joueurs = this.joueurService.listeJoueurs();
  }
}