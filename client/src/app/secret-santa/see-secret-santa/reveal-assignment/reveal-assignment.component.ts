import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecretSantaService } from '../../secret-santa.service';
import { GiftAssignment } from '../../git-assignement.model';

@Component({
  selector: 'app-reveal-assignment',
  standalone: true,
  imports: [],
  templateUrl: './reveal-assignment.component.html',
  styleUrl: './reveal-assignment.component.css'
})
export class RevealAssignmentComponent {
  participantName: string = '';
  reciever: string | undefined = '';
  CurrentGiftAssignement: GiftAssignment | undefined = undefined;
  private route = inject(ActivatedRoute);
  private SecretSantaService= inject(SecretSantaService);

  ngOnInit(): void {
    this.participantName = this.route.snapshot.paramMap.get('participantName')!;
    this.CurrentGiftAssignement = this.SecretSantaService.getSingleGiftAssignement(this.participantName);
    this.reciever = this.CurrentGiftAssignement?.receiver;
  }

  revealReciever(participantName : string): void {
    console.log("coucou"+ participantName)
  }
}
