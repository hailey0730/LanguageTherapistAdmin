import { Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
// import { GridSystemComponent } from './grid/grid.component';

export const CustomerRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: CustomerComponent
        }]
    }
];
