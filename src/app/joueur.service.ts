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

  // Données de secours si le backend est éteint
  private fallbackPostes: Poste[] = [
    { idPoste: 1, nomPoste: 'Gardien' },
    { idPoste: 2, nomPoste: 'Défenseur' },
    { idPoste: 3, nomPoste: 'Milieu' },
    { idPoste: 4, nomPoste: 'Attaquant' }
  ];

  private fallbackJoueurs: Joueur[] = [
    { cin: 11223344, nomJoueur: 'Messi', prenomJoueur: 'Lionel', equipeInstant: 'Inter Miami', dateMercato: new Date('2023-07-15'), poste: { idPoste: 4, nomPoste: 'Attaquant' } },
    { cin: 22334455, nomJoueur: 'Ronaldo', prenomJoueur: 'Cristiano', equipeInstant: 'Al Nassr', dateMercato: new Date('2023-01-01'), poste: { idPoste: 4, nomPoste: 'Attaquant' } },
    { cin: 33445566, nomJoueur: 'Neymar', prenomJoueur: 'Jr', equipeInstant: 'Al Hilal', dateMercato: new Date('2023-08-15'), poste: { idPoste: 3, nomPoste: 'Milieu' } }
  ];

  constructor(private http: HttpClient) { }

  listeJoueurs(): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.apiURL).pipe(
      catchError(() => of(this.fallbackJoueurs))
    );
  }

  ajouterJoueur(j: Joueur): Observable<Joueur> {
    return this.http.post<Joueur>(this.apiURL, j, httpOptions).pipe(
      catchError(() => {
        this.fallbackJoueurs.push(j);
        return of(j);
      })
    );
  }

  supprimerJoueur(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(() => {
        this.fallbackJoueurs = this.fallbackJoueurs.filter(j => j.cin !== id);
        return of(null);
      })
    );
  }

  consulterJoueur(id: number): Observable<Joueur> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Joueur>(url).pipe(
      catchError(() => of(this.fallbackJoueurs.find(j => j.cin === id)!))
    );
  }

  updateJoueur(j: Joueur): Observable<Joueur> {
    return this.http.put<Joueur>(this.apiURL, j, httpOptions).pipe(
      catchError(() => {
        const idx = this.fallbackJoueurs.findIndex(item => item.cin === j.cin);
        if (idx > -1) this.fallbackJoueurs[idx] = j;
        return of(j);
      })
    );
  }

  listePostes(): Observable<PosteWrapper> {
    return this.http.get<PosteWrapper>(this.apiURLPoste).pipe(
      catchError(() => of({ _embedded: { postes: this.fallbackPostes } }))
    );
  }

  consulterPoste(id: number): Observable<Poste> {
    const url = `${this.apiURLPoste}/${id}`;
    return this.http.get<Poste>(url).pipe(
      catchError(() => of(this.fallbackPostes.find(p => p.idPoste == id)!))
    );
  }

  ajouterPoste(p: Poste): Observable<Poste> {
    return this.http.post<Poste>(this.apiURLPoste, p, httpOptions).pipe(
      catchError(() => {
        this.fallbackPostes.push(p);
        return of(p);
      })
    );
  }

  updatePoste(p: Poste): Observable<Poste> {
    const url = `${this.apiURLPoste}/${p.idPoste}`;
    return this.http.put<Poste>(url, p, httpOptions).pipe(
      catchError(() => {
        const idx = this.fallbackPostes.findIndex(item => item.idPoste == p.idPoste);
        if (idx > -1) this.fallbackPostes[idx] = p;
        return of(p);
      })
    );
  }

  supprimerPoste(id: number): Observable<any> {
    const url = `${this.apiURLPoste}/${id}`;
    return this.http.delete(url, httpOptions).pipe(
      catchError(() => {
        this.fallbackPostes = this.fallbackPostes.filter(p => p.idPoste != id);
        return of(null);
      })
    );
  }

  rechercherParPoste(idPoste: number): Observable<Joueur[]> {
    if (!idPoste || idPoste === 0) {
      return this.listeJoueurs();
    }
    const url = `${this.apiURL}/joueursposte/${idPoste}`;
    return this.http.get<Joueur[]>(url).pipe(
      catchError(() => of(this.fallbackJoueurs.filter(j => j.poste?.idPoste == idPoste)))
    );
  }
}
