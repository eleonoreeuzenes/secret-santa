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
  private apiUrl = environment.apiUrl + '/event';

  submitEvent(data: SecretSanta): Observable<SecretSantaResponse> { 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<SecretSantaResponse>(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Delivery problem:', error);
        return throwError(() => new Error('Oops! Something went wrong. Please try again later.'));
      })
    );
  }
}
