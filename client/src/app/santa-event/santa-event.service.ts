import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { SantaEvent } from './santa-event.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SantaEventService {

  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl+'/event';

  submitEvent(data: SantaEvent) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<SantaEvent>(this.apiUrl, data, { headers }).pipe(
      catchError(error => {
        console.error('Delivery problem:', error);
        return throwError(() => new Error('Oops! Something went wrong. Please try again later.'));
      })
    )
    .subscribe(data => {
      console.log("succesful" + data)
    });
  }

}
