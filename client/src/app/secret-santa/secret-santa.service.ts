import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { SecretSanta, SecretSantaResponse } from './secret-santa.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  submitSecretSanta(data: SecretSanta): Observable<SecretSantaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<SecretSantaResponse>(this.apiUrl+ '/event', data, { headers }).pipe(
      catchError((error) => {
        console.error('Error on creating a secret santa:', error);
        return throwError(() => new Error('Oups ! Un problème est survenu. Veuillez réessayer plus tard.'));
      })
    );
  }

  getSecretSanta(secretSantaID: string): Observable<SecretSantaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get<SecretSantaResponse>(this.apiUrl+ '/events/'+ secretSantaID,  { headers }).pipe(
      catchError((error) => {
        console.error('Error on creating a secret santa:', error);
        return throwError(() => new Error('Oups ! Un problème est survenu. Veuillez réessayer plus tard.'));
      })
    );
  }
}
