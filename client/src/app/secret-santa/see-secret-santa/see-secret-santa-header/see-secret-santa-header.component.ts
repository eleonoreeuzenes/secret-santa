import { Component, Input } from '@angular/core';
import { SecretSantaResponse } from '../../secret-santa.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-secret-santa-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './see-secret-santa-header.component.html',
  styleUrls: ['./see-secret-santa-header.component.css']
})
export class SeeSecretSantaHeaderComponent {
  @Input() secretSantaDetails!: SecretSantaResponse;
}
