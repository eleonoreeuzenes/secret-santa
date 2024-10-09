import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    participants: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
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
    budget: new FormControl<number | string>(5, { validators: [Validators.required] }),
  });

  get participants() {
    return this.form.get('participants') as FormArray;
  }

  addParticipant() {
    this.participants.push(new FormControl('', Validators.required));
  }

  budgetOptions: Array<{ label: string; value: number | string }> = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: 'Autre', value: 'custom' },
  ];

  customBudgetValue: number | null = null;

  selectBudget(value: any) {
    this.customBudgetValue = null;
    this.form.get('budget')?.setValue(value);
  }

  onCustomBudgetInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.customBudgetValue = Number(input.value);
    this.form.get('budget')?.setValue(this.customBudgetValue);
  }

  isCustomBudgetSelectedOrEntered(): boolean {
    return this.form.get('budget')?.value === 'custom' || this.customBudgetValue !== null;
  }

  onSubmit() {
    if (this.form.valid) { 
      console.log(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
