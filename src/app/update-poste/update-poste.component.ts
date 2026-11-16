import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Poste } from '../model/poste.model';

@Component({
  selector: 'app-update-poste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-poste.component.html',
  styles: [
  ]
})
export class UpdatePosteComponent implements OnInit {

  @Input()
  poste!: Poste;

  @Input()
  ajout!: boolean;

  @Output()
  posteUpdated = new EventEmitter<Poste>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdatePoste ", this.poste);
  }

  savePoste(): void {
    this.posteUpdated.emit(this.poste);
  }

}
