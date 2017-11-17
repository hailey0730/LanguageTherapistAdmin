import { Routes } from '@angular/router';

import { FillInBlanksComponent } from './fillInBlanks/fillInBlanks.component';
// import { GridSystemComponent } from './grid/grid.component';



export const ExercisesRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'fillInBlanks',
        component: FillInBlanksComponent
    }]}
];
