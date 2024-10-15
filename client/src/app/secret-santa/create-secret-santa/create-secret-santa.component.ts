import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecretSanta, SecretSantaResponse  } from '../secret-santa.model';
import { SecretSantaService } from '../secret-santa.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-create-santa-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './create-secret-santa.component.html',
  styleUrl: './create-secret-santa.component.css'
})
export class CreateSecretSantaComponent {

  errorMessage: string | null = null;
  private SecretSantaService= inject(SecretSantaService);
  private router = inject(Router);
  currentStep = 1;
  progress = 25;

  form = new FormGroup({
    participants: new FormArray([
      new FormControl('', {validators : [Validators.required]}),
      new FormControl('', {validators : [Validators.required]}),
      new FormControl('', {validators : [Validators.required]}),
    ],
  ),
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

  get validParticipants() {
    const participantNames = this.participants.controls.map(control => control.value);
    return participantNames.filter(name => name.trim() !== '').length >= 3;
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

  isContinuerClicked: boolean = false;

  nextStep() {
    this.isContinuerClicked = true;
    if (this.currentStep === 1 && this.validParticipants) {
      this.isContinuerClicked = false;
      this.currentStep++;
      this.updateProgress();
    } else if (this.currentStep === 2 && this.form.get('infos')?.valid) {
      this.isContinuerClicked = false;
      this.currentStep++;
      this.updateProgress();
    } else if (this.currentStep === 3 && this.form.get('budget')?.valid) {
      this.isContinuerClicked = false;
      this.currentStep++;
      this.updateProgress();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.progress = (this.currentStep / 4) * 100;
  }

  onSubmit() {

    if (!this.form.valid) {
      console.log('Form is invalid');
      return;
    }

      const formData = this.form.value;
      const SecretSanta : SecretSanta  = {
        participants: formData.participants!.filter(participant => participant !== null) as string[],
        organizer: formData.infos!.organiser!,
        event_name: formData.infos!.eventName!,
        event_date: formData.infos!.eventDate!,
        event_location: formData.infos!.eventLocation!,
        budget: formData.budget === 'custom' ? this.customBudgetValue! : formData.budget!

      };

      this.SecretSantaService.submitEvent(SecretSanta ).subscribe({
        next: (response: SecretSantaResponse ) => {
          const secretSantaID = response._id;
          const organizer = response.organizer;
          const eventName = response.event_name;
          this.router.navigate(['/invite', secretSantaID], {
            queryParams: { eventName: eventName, organizer: organizer }
          });
        },
        error: (err: Error) => {
          console.error('Error:', err.message);
          this.errorMessage = err.message;
        }
      });

  }

}
