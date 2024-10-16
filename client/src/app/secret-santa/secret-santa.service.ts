import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { SecretSanta, SecretSantaResponse } from './secret-santa.model';
import { environment } from '../../environments/environment';
import { GiftAssignment, GiftAssignmentsArray } from './git-assignement.model';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private secretSantaDetails!: SecretSantaResponse;
  private giftAssignementsOfEvent! : GiftAssignmentsArray;

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

  getGiftAssignementByEvent(secretSantaID: string): Observable<GiftAssignmentsArray> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get<GiftAssignmentsArray>(this.apiUrl+ '/assignments/event/'+ secretSantaID,  { headers }).pipe(
      catchError((error) => {
        console.error('Error on getting secret santa assignements:', error);
        return throwError(() => new Error('Oups ! Un problème est survenu. Veuillez réessayer plus tard.'));
      })
    );
  }

  flagGiftAssignementAsRevealed(giftAssignementID: string, data: GiftAssignment): Observable<GiftAssignment> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log("data");
    console.log(data);

    return this.httpClient.put<GiftAssignment>(this.apiUrl+ '/assignments/'+ giftAssignementID, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error on updating gift assignement:', error);
        return throwError(() => new Error('Oups ! Un problème est survenu. Veuillez réessayer plus tard.'));
      })
    );
  }

  setSecretSantaDetails(details: SecretSantaResponse): void {
    this.secretSantaDetails = details;
  }

  getSecretSantaDetails(): SecretSantaResponse {
    return this.secretSantaDetails;
  }

  setGiftAssignementByEvent(details: GiftAssignmentsArray): void {
    this.giftAssignementsOfEvent = details;
  }

  //TODO : rename methods for clarity
  getGiftAssignementsOfEvent(): GiftAssignmentsArray | undefined {
    if (!this.giftAssignementsOfEvent) {
      console.error('Gift assignments not set');
      return undefined;
    }
    return this.giftAssignementsOfEvent;
  }

  getSingleGiftAssignement(giver: string): GiftAssignment | undefined {
    if (!this.giftAssignementsOfEvent) {
      console.error('Gift assignments not set');
      return undefined;
    }

    const assignment = this.giftAssignementsOfEvent.find(gift => gift.giver === giver);

    if (!assignment) {
      console.warn(`No gift assignment found for giver: ${giver}`);
    }

    return assignment;
  }

}
