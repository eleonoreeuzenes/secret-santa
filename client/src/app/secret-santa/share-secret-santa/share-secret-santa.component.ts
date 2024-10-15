import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterOutlet,
  Router
 } from '@angular/router';
import { SecretSantaService } from '../secret-santa.service';

@Component({
  selector: 'app-share-secret-santa',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './share-secret-santa.component.html',
  styleUrl: './share-secret-santa.component.css'
})
export class ShareSecretSantaComponent{
  secretSantaID: string = '';
  eventName: string = '';
  organizer: string = '';
  inviteLink: string = '';

  private secretSantaService = inject(SecretSantaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.secretSantaID = this.route.snapshot.paramMap.get('secretSantaID')!;

    this.activatedRoute.queryParams.subscribe(params => {
      this.organizer = params['organizer'];
      this.eventName = params['eventName'];
    });
    console.log("this organizer: "+ this.organizer);
    console.log("this event: "+ this.eventName);
    this.inviteLink = `${window.location.origin}/secretsanta/${this.secretSantaID}`;
  }

   copyLink() {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      alert('Le lien a été copié dans le presse-papier !');
    }).catch(err => {
      console.error('Erreur lors de la copie du lien:', err);
    });
  }
}
