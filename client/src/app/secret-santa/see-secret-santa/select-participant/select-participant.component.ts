import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretSantaResponse  } from '../../secret-santa.model';
import {
  ActivatedRoute,
  Router
 } from '@angular/router';
import { SecretSantaService } from '../../secret-santa.service';

@Component({
  selector: 'app-select-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-participant.component.html',
  styleUrl: './select-participant.component.css'
})
export class SelectParticipantComponent {
  participants: string[] = [];
  errorMessage: string = '';
  secretSantaID: string = '';

  private secretSantaService = inject(SecretSantaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadParticipants();
    this.secretSantaID = this.route.parent?.snapshot.paramMap.get('secretSantaID')!;
  }

  loadParticipants(): void {
    const secretSantaDetails = this.secretSantaService.getSecretSantaDetails();
    if (secretSantaDetails && secretSantaDetails.participants) {
      this.participants = secretSantaDetails.participants;
    } else {
      this.errorMessage = 'No participants found.';
    }
  }


  goToConfirmParticipant(participantName: string): void {
    this.router.navigate(['secretsanta', this.secretSantaID, 'confirm-participant', participantName]);

  }
}
