import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AnimationsLabComponent } from './pages/animations-lab/animations-lab';
import { RouterLabComponent } from './pages/router-lab/router-lab';
import { OverviewComponent } from './pages/router-lab/overview/overview';
import { PlaygroundComponent } from './pages/router-lab/playground/playground';
import { DetailsComponent } from './pages/router-lab/details/details';
import { DragDropLabComponent } from './pages/drag-drop-lab/drag-drop-lab';
import { FormsLabComponent } from './pages/forms-lab/forms-lab';
import { ModalLabComponent } from './pages/modal-lab/modal-lab';
import { ThemeLabComponent } from './pages/theme-lab/theme-lab';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'labs/animations',
    component: AnimationsLabComponent,
  },
  {
    path: 'labs/router',
    component: RouterLabComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'playground',
        component: PlaygroundComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },
  {
    path: 'labs/drag-drop',
    component: DragDropLabComponent,
  },
  {
    path: 'labs/forms',
    component: FormsLabComponent,
  },
  {
    path: 'labs/modal',
    component: ModalLabComponent,
  },
  {
    path: 'labs/theme',
    component: ThemeLabComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
