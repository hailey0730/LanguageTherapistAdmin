import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FillInBlanksComponent } from './fillInBlanks/fillInBlanks.component';
import { ViewQuestionsRoutes } from './viewQuestions.routing';
// import { GridSystemComponent } from './grid/grid.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ViewQuestionsRoutes),
    FormsModule,
    MyDateRangePickerModule
  ],
  declarations: [
      FillInBlanksComponent
  ]
})

export class ViewQuestionsModule {}
