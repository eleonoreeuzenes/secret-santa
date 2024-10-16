import { Routes } from '@angular/router';
import { ShareSecretSantaComponent } from './secret-santa/share-secret-santa/share-secret-santa.component';
import { CreateSecretSantaComponent } from './secret-santa/create-secret-santa/create-secret-santa.component';
import { SeeSecretSantaComponent } from './secret-santa/see-secret-santa/see-secret-santa.component';
import { ConfirmParticipantComponent } from './secret-santa/see-secret-santa/confirm-participant/confirm-participant.component';
import { RevealAssignmentComponent } from './secret-santa/see-secret-santa/reveal-assignment/reveal-assignment.component';
import { SelectParticipantComponent } from './secret-santa/see-secret-santa/select-participant/select-participant.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateSecretSantaComponent,
    title: 'Générateur de Secret Santa',
  },
  {
    path: 'invite/:secretSantaID',
    component: ShareSecretSantaComponent
  },
  {
    path: 'secretsanta/:secretSantaID',
    component: SeeSecretSantaComponent,
    children: [
      {
        path: '',
        component: SelectParticipantComponent,
      },
      {
        path: 'confirm-participant/:participantName',
        component: ConfirmParticipantComponent,
      },
      {
        path: 'reveal-assignment/:participantName',
        component: RevealAssignmentComponent,
      }
    ]
  },
];
