import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecretSantaService } from '../../secret-santa.service';
import { GiftAssignment } from '../../git-assignement.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reveal-assignment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reveal-assignment.component.html',
  styleUrl: './reveal-assignment.component.css'
})
export class RevealAssignmentComponent {
  participantName: string = '';
  reciever: string | undefined = 'Cliquez pour révéler le nom';
  CurrentGiftAssignement: GiftAssignment | undefined = undefined;
  buttonClass: string = "bg-indigo-600 text-white hover:bg-indigo-800";
  private route = inject(ActivatedRoute);
  private SecretSantaService= inject(SecretSantaService);

  ngOnInit(): void {
    this.participantName = this.route.snapshot.paramMap.get('participantName')!;
    this.CurrentGiftAssignement = this.SecretSantaService.getSingleGiftAssignement(this.participantName);

  }

  revealReciever(participantName : string): void {
    this.reciever = this.CurrentGiftAssignement?.receiver;
    this.buttonClass = "bg-white text-indigo-600 border border-slate-300"
  }
}
