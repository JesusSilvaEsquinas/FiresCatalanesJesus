import { Routes } from '@angular/router';

import { FeriasPageComponent } from './view/pages/ferias-page/ferias-page.component';
import { FavoritasPageComponent } from './view/pages/favoritas-page/favoritas-page.component';

export const routes: Routes = [
  {
    path: 'ferias',
    children: [
      {
        path: '',
        component: FeriasPageComponent
      },
      {
        path: 'favoritas',
        component: FavoritasPageComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'ferias',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ferias'
  }
];
