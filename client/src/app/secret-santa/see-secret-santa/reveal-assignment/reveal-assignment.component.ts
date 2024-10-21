import { Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecretSantaService } from '../../secret-santa.service';
import { GiftAssignment } from '../../git-assignement.model';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

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
  errorMessage: string = '';

  ngOnInit(): void {
    this.participantName = this.route.snapshot.paramMap.get('participantName')!;
    this.CurrentGiftAssignement = this.SecretSantaService.getSingleGiftAssignement(this.participantName);
    console.log("gift pairs : " + this.CurrentGiftAssignement);
    console.log(this.CurrentGiftAssignement);
  }

  revealReciever(participantName : string): void {
    this.SecretSantaService.flagGiftAssignementAsRevealed(this.CurrentGiftAssignement!._id, this.CurrentGiftAssignement!).subscribe({
      next: () => {
        this.reciever = this.CurrentGiftAssignement?.receiver;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });


        this.buttonClass = "bg-white text-indigo-600 border border-slate-300";
        this.CurrentGiftAssignement!.revealed=true;
      },
      error: (error) => {
        return this.errorMessage = error.message;
      }
    });
  }
}
