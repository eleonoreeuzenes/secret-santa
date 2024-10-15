import { Routes } from '@angular/router';
import { ShareSecretSantaComponent } from './secret-santa/share-secret-santa/share-secret-santa.component';
import { CreateSecretSantaComponent } from './secret-santa/create-secret-santa/create-secret-santa.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateSecretSantaComponent,
    title: 'Générateur de Secre Santa',
  },
  {
    path: 'invite/:secretSantaID',
    component: ShareSecretSantaComponent
  },
];
