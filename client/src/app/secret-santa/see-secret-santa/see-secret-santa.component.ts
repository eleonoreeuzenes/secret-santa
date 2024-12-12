import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretSantaResponse } from '../secret-santa.model';
import { SecretSantaService } from '../secret-santa.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
  Router
 } from '@angular/router';
import { SeeSecretSantaHeaderComponent } from './see-secret-santa-header/see-secret-santa-header.component';

@Component({
  selector: 'app-see-secret-santa',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SeeSecretSantaHeaderComponent],
  templateUrl: './see-secret-santa.component.html',
  styleUrl: './see-secret-santa.component.css'
})
export class SeeSecretSantaComponent {
  secretSantaID: string = '';
  secretSantaDetails: SecretSantaResponse = {
    _id: this.secretSantaID,
    organizer: "",
    event_name: "",
    event_date: "",
    event_location: "",
    budget: "",
    participants: [""],
  };
  errorMessage: string = '';
  private route = inject(ActivatedRoute);
  private SecretSantaService= inject(SecretSantaService);

  ngOnInit(): void {
    this.secretSantaID = this.route.snapshot.paramMap.get('secretSantaID')!;
    this.SecretSantaService.getSecretSanta(this.secretSantaID).subscribe({
      next: (response) => {
        this.secretSantaDetails = response;
        this.SecretSantaService.setSecretSantaDetails(response);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
    this.SecretSantaService.getGiftAssignementByEvent(this.secretSantaID).subscribe({
      next: (response) => {
        this.SecretSantaService.setGiftAssignementByEvent(response);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
