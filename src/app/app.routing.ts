import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    // default home page
    {
        path: '',
        redirectTo:'dashboard',
        pathMatch:'full',
    },
    {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    //  {
    //     path: 'components',
    //     loadChildren: './components/components.module#ComponentsModule'
    // }
     {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: 'customer',
        loadChildren: './customer/customer.module#CustomerModule'
    }, {
        path: 'exercises',
        loadChildren:'./exercises/exercises.module#ExercisesModule'
    }, {
        path: 'viewQuestions',
        loadChildren: './viewQuestions/viewQuestions.module#ViewQuestionsModule'
    }, {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
    }
  ]
    }
    // ,
    // different page layout 
    // {
    //   path: '',
    //   component: AuthLayoutComponent,
    //   children: [{
    //     path: 'pages',
    //     loadChildren: './pages/pages.module#PagesModule'
    //   }]
    // }
];
