import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretSanta, SecretSantaResponse  } from '../../secret-santa.model';
import { SecretSantaService } from '../../secret-santa.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
  Router
 } from '@angular/router';
import { SeeSecretSantaHeaderComponent } from '../see-secret-santa-header/see-secret-santa-header.component';

@Component({
  selector: 'app-confirm-participant',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SeeSecretSantaHeaderComponent],
  templateUrl: './confirm-participant.component.html',
  styleUrl: './confirm-participant.component.css'
})
export class ConfirmParticipantComponent {
  participantName: string = '';
  secretSantaID: string = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    // Get the participantName from the route parameters
    this.participantName = this.route.snapshot.paramMap.get('participantName')!;
    this.secretSantaID = this.route.parent?.snapshot.paramMap.get('secretSantaID')!;
  }

  goToRevealParticipant(participantName: string): void {
    this.router.navigate(['secretsanta', this.secretSantaID, 'reveal-assignment', participantName]);

  }
}
