import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { SecretSanta, SecretSantaResponse } from './secret-santa.model';
import { environment } from '../../environments/environment';
import { GiftAssignment, GiftAssignmentsArray } from './git-assignement.model';

@Injectable({
  providedIn: 'root',
})
export class SecretSantaService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private secretSantaDetails$ = new BehaviorSubject<SecretSantaResponse | null>(null);
  private giftAssignementsOfEvent$ = new BehaviorSubject<GiftAssignmentsArray | null>(null);

  submitSecretSanta(data: SecretSanta): Observable<SecretSantaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<SecretSantaResponse>(this.apiUrl + '/event', data, { headers }).pipe(
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

    return this.httpClient.get<SecretSantaResponse>(this.apiUrl + '/events/' + secretSantaID, { headers }).pipe(
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

    return this.httpClient.get<GiftAssignmentsArray>(this.apiUrl + '/assignments/event/' + secretSantaID, { headers }).pipe(
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

    return this.httpClient.put<GiftAssignment>(this.apiUrl + '/assignments/' + giftAssignementID, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error on updating gift assignement:', error);
        return throwError(() => new Error('Oups ! Un problème est survenu. Veuillez réessayer plus tard.'));
      })
    );
  }

  setSecretSantaDetails(details: SecretSantaResponse): void {
    this.secretSantaDetails$.next(details);
  }

  getSecretSantaDetails(): Observable<SecretSantaResponse | null> {
    return this.secretSantaDetails$.asObservable();
  }

  setGiftAssignementByEvent(assignments: GiftAssignmentsArray): void {
    this.giftAssignementsOfEvent$.next(assignments);
  }

  getGiftAssignementsOfEvent(): Observable<GiftAssignmentsArray | null> {
    return this.giftAssignementsOfEvent$.asObservable();
  }

  getSingleGiftAssignement(giver: string): GiftAssignment | undefined {
    const assignments = this.giftAssignementsOfEvent$.getValue();
    if (!assignments) {
      console.error('Gift assignments not set');
      return undefined;
    }

    const assignment = assignments.find(gift => gift.giver === giver);

    if (!assignment) {
      console.warn(`No gift assignment found for giver: ${giver}`);
    }

    return assignment;
  }
}
