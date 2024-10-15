import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretSanta, SecretSantaResponse  } from '../secret-santa.model';
import { SecretSantaService } from '../secret-santa.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
 } from '@angular/router';

@Component({
  selector: 'app-see-secret-santa',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
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
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
