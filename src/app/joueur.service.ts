import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Joueur } from './model/Joueurs.model';
import { Poste } from './model/poste.model';
import { PosteWrapper } from './model/posteWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  apiURL: string = 'http://localhost:8082/joueurs/api';
  apiURLPoste: string = 'http://localhost:8082/joueurs/cat';

  // Postes par défaut si le backend est éteint
  private defaultPostes: Poste[] = [
    { idPoste: 1, nomPoste: 'Gardien' },
    { idPoste: 2, nomPoste: 'Défenseur' },
    { idPoste: 3, nomPoste: 'Milieu' },
    { idPoste: 4, nomPoste: 'Attaquant' }
  ];

  constructor(private http: HttpClient) { }

  listeJoueurs(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.apiURL);
  }

  ajouterJoueur(j: Joueur): Observable<Joueur> {
    return this.http.post<Joueur>(this.apiURL, j, httpOptions);
  }

  supprimerJoueur(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterJoueur(id: number): Observable<Joueur> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Joueur>(url);
  }

  updateJoueur(j: Joueur): Observable<Joueur> {
    return this.http.put<Joueur>(this.apiURL, j, httpOptions);
  }

  listePostes(): Observable<PosteWrapper> {
    return this.http.get<PosteWrapper>(this.apiURLPoste).pipe(
      catchError(() => of({ _embedded: { postes: this.defaultPostes } }))
    );
  }

  consulterPoste(id: number): Observable<Poste> {
    const url = `${this.apiURLPoste}/${id}`;
    return this.http.get<Poste>(url).pipe(
      catchError(() => of(this.defaultPostes.find(p => p.idPoste == id)!))
    );
  }

  ajouterPoste(p: Poste): Observable<Poste> {
    return this.http.post<Poste>(this.apiURLPoste, p, httpOptions);
  }

  updatePoste(p: Poste): Observable<Poste> {
    const url = `${this.apiURLPoste}/${p.idPoste}`;
    return this.http.put<Poste>(url, p, httpOptions);
  }

  supprimerPoste(id: number): Observable<any> {
    const url = `${this.apiURLPoste}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  rechercherParPoste(idPoste: number): Observable<Joueur[]> {
    if (!idPoste || idPoste === 0) {
      return this.listeJoueurs();
    }
    const url = `${this.apiURL}/joueursposte/${idPoste}`;
    return this.http.get<Joueur[]>(url);
  }
}
