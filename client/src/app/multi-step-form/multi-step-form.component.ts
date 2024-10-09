import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})
export class MultiStepFormComponent {

  form = new FormGroup({
    particpants: new FormGroup({
      participantOne: new FormControl('', {
        validators: [Validators.required],
      }),
      participantTwo: new FormControl('', {
        validators: [Validators.required],
      }),
      participantThree: new FormControl('', {
        validators: [Validators.required],
      }),
    })
  });

  onSubmit() {
    console.log(this.form.value);
  }

}
