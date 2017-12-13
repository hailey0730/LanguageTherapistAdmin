import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';
import { MaterialModule, MdSelectModule } from '@angular/material';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { CustomerComponent } from './customer.component';
import { CustomerRoutes } from './customer.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CustomerRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MdSelectModule,
        MyDateRangePickerModule
    ],
    declarations: [CustomerComponent]
})

export class CustomerModule { }
