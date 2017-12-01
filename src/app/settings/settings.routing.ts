import { Routes } from '@angular/router';

import { AccountDetailsComponent } from './accountDetails/accountDetails.component';
import { WorkingHoursComponent } from './workingHours/workingHours.component';
import { BreaksComponent } from './breaks/breaks.component';
// import { GridSystemComponent } from './grid/grid.component';



export const SettingsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'accountDetails',
            component: AccountDetailsComponent
        }, {
            path: 'workingHours',
            component: WorkingHoursComponent
            }, {
                path: 'breaks',
                component: BreaksComponent
            }]
    }
];
