import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterOutlet],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
