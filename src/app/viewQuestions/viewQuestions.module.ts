import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewQuestionsRoutes } from './viewQuestions.routing';
// import { GridSystemComponent } from './grid/grid.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { FillInBlanksComponent } from './fillInBlanks/fillInBlanks.component';

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
