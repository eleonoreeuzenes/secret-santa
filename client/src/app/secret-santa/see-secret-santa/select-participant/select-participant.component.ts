import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretSantaResponse  } from '../../secret-santa.model';
import {
  ActivatedRoute,
  Router
 } from '@angular/router';
import { SecretSantaService } from '../../secret-santa.service';
import { GiftAssignmentsArray } from '../../git-assignement.model';

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
  giftAssignements: GiftAssignmentsArray | undefined = undefined;

  private secretSantaService = inject(SecretSantaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.secretSantaID = this.route.parent?.snapshot.paramMap.get('secretSantaID')!;
    this.secretSantaService.getGiftAssignementByEvent(this.secretSantaID).subscribe({
      next: (response) => {
        this.secretSantaService.setGiftAssignementByEvent(response);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error fetching assignments:', error);
      }
    });
    this.secretSantaService.getGiftAssignementsOfEvent().subscribe({
      next: (assignments) => {
        if (assignments) {
          this.giftAssignements = assignments;
        } else {
          console.error('Gift assignments not available yet.');
        }
      },
      error: (error) => {
        console.error('Error loading gift assignments:', error);
      }
    });
  }

  goToConfirmParticipant(participantName: string): void {
    this.router.navigate(['secretsanta', this.secretSantaID, 'confirm-participant', participantName]);

  }
}
