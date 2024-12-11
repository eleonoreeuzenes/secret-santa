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
        console.log('RESPONSE :'+ response)
        console.log(response)
        this.secretSantaDetails = response;
        console.log('this.secretSantaDetails :'+ this.secretSantaDetails)
        console.log(this.secretSantaDetails);
        this.SecretSantaService.setSecretSantaDetails(response);

      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
    this.SecretSantaService.getGiftAssignementByEvent(this.secretSantaID).subscribe({
      next: (response) => {
        this.SecretSantaService.setGiftAssignementByEvent(response);
        console.log("this.SecretSantaService.setGiftAssignementByEvent(response);")
        console.log(response);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
