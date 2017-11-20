import { Routes } from '@angular/router';

import { AccountDetailsComponent } from './accountDetails/accountDetails.component';
// import { GridSystemComponent } from './grid/grid.component';



export const SettingsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'accountDetails',
            component: AccountDetailsComponent
        }]
    }
];