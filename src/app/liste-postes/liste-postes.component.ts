import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poste } from '../model/poste.model';
import { JoueurService } from '../joueur.service';
import { UpdatePosteComponent } from '../update-poste/update-poste.component';

@Component({
  selector: 'app-liste-postes',
  standalone: true,
  imports: [CommonModule, UpdatePosteComponent],
  templateUrl: './liste-postes.component.html',
  styles: [
  ]
})
export class ListePostesComponent implements OnInit {

  postes!: Poste[];
  updatedPoste: Poste = { idPoste: 0, nomPoste: '' };
  ajout: boolean = true;

  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    this.chargerPostes();
  }

  chargerPostes() {
    this.postes = this.joueurService.listePostes();
  }

  posteUpdated(poste: Poste) {
    console.log("Poste updated event", poste);
    if (this.ajout) {
      this.joueurService.ajouterPoste(poste);
    } else {
      this.joueurService.updatePoste(poste);
    }
    this.chargerPostes();
    this.ajout = true;
    this.updatedPoste = { idPoste: 0, nomPoste: '' };
  }

  updatePoste(poste: Poste) {
    this.updatedPoste = { ...poste };
    this.ajout = false;
  }

}
