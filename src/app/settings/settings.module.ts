import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountDetailsComponent } from './accountDetails/accountDetails.component';
import { SettingsRoutes } from './settings.routing';
// import { GridSystemComponent } from './grid/grid.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SettingsRoutes),
        FormsModule,
        MyDateRangePickerModule
    ],
    declarations: [
        AccountDetailsComponent
    ]
})

export class SettingsModule { }
