import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { FillInBlanksComponent } from './fillInBlanks/fillInBlanks.component';
import { ExercisesRoutes } from './exercises.routing';
// import { GridSystemComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExercisesRoutes),
    FormsModule,
    TagInputModule
  ],
  declarations: [
      FillInBlanksComponent
  ]
})

export class ExercisesModule {}
