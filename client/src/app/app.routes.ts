import { Routes } from '@angular/router';
import { ShareSecretSantaComponent } from './secret-santa/share-secret-santa/share-secret-santa.component';
import { CreateSecretSantaComponent } from './secret-santa/create-secret-santa/create-secret-santa.component';
import { SeeSecretSantaComponent } from './secret-santa/see-secret-santa/see-secret-santa.component';
import { ConfirmParticipantComponent } from './secret-santa/see-secret-santa/confirm-participant/confirm-participant.component';
import { RevealAssignmentComponent } from './secret-santa/see-secret-santa/reveal-assignment/reveal-assignment.component';
import { SelectParticipantComponent } from './secret-santa/see-secret-santa/select-participant/select-participant.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateSecretSantaComponent,
    title: 'Générateur de Secret Santa',
  },
  {
    path: 'invite/:secretSantaID',
    component: ShareSecretSantaComponent,
    title: 'Invitation au Secret Santa',
  },
  {
    path: 'secretsanta/:secretSantaID',
    component: SeeSecretSantaComponent,
    title: 'Participez au Secret Santa',
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
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page non trouvée',
  },
];
