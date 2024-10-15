import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
 } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-share-secret-santa',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, HeaderComponent],
  templateUrl: './share-secret-santa.component.html',
  styleUrl: './share-secret-santa.component.css'
})
export class ShareSecretSantaComponent{
  secretSantaID: string = '';
  eventName: string = '';
  organizer: string = '';
  inviteLink: string = '';

  copySuccess: boolean = false;
  copyError: boolean = false;
  copyMessage: string = '';

  private route = inject(ActivatedRoute);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.secretSantaID = this.route.snapshot.paramMap.get('secretSantaID')!;

    this.activatedRoute.queryParams.subscribe(params => {
      this.organizer = params['organizer'];
      this.eventName = params['eventName'];
    });

    this.inviteLink = `${window.location.origin}/secretsanta/${this.secretSantaID}`;
  }

   copyLink() {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      this.copySuccess = true;
      this.copyMessage = 'Le lien a été copié dans le presse-papier !';
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    }).catch(err => {
      this.copyError = true;
      console.error('Erreur lors de la copie du lien:', err);
      this.copyMessage = 'Erreur lors de la copie du lien. Veuillez réessayer.';
      setTimeout(() => {
        this.copyError = false;
      }, 3000);
    });
  }
}
