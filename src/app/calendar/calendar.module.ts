import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';
import { MaterialModule, MdSelectModule } from '@angular/material';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MdSelectModule
    ],
    declarations: [CalendarComponent]
})

export class CalendarModule {}
