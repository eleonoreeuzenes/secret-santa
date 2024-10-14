import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { SecretSanta  } from './secret-santa.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/event';

  submitEvent(data: SecretSanta ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<SecretSanta >(this.apiUrl, data, { headers }).pipe(
      catchError(error => {
        console.error('Delivery problem:', error);
        return throwError(() => new Error('Oops! Something went wrong. Please try again later.'));
      })
    )
  }

}
