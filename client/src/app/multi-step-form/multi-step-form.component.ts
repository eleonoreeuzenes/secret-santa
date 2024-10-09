import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    }),
    infos: new FormGroup({
      organiser: new FormControl('', {
        validators: [Validators.required],
      }),
      eventName: new FormControl('', {
        validators: [Validators.required],
      }),
      eventDate: new FormControl('', {
        validators: [Validators.required],
      }),
      eventLocation: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    budget: new FormControl<'5' | '10' | '15' | '20' | '50' | 'custom'>('5', { validators: [Validators.required] }),
  });

  budgetOptions: Array<{ label: string; value: '5' | '10' | '15' | '20' | '50' | 'custom' }> = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: 'Autre', value: 'custom' },
  ];

  selectBudget(value: '5' | '10' | '15' | '20' | '50' | 'custom') {
    this.form.get('budget')?.setValue(value);
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
