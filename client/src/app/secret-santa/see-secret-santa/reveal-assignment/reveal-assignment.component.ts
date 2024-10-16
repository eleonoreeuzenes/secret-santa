import { Component } from '@angular/core';

@Component({
  selector: 'app-reveal-assignment',
  standalone: true,
  imports: [],
  templateUrl: './reveal-assignment.component.html',
  styleUrl: './reveal-assignment.component.css'
})
export class RevealAssignmentComponent {
  participantName: string = 'Richard';
  reciever: string = 'Lara';

  revealReciever(participantName : string): void {
    console.log("coucou"+ participantName)
  }
}
