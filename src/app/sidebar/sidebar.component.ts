import { Component, OnInit } from '@angular/core';
import * as Ps from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },
    {
        path: '/customer',
        title: 'Customer',
        type: 'link',
        icontype: 'person'
    },
     {
        path: '/exercises',
        title: 'Exercises',
        type: 'sub',
        icontype: 'assignment',
        children: [
            { path: 'fillInBlanks', title: 'Fill in the blanks', ab: '' }
           
        ]
    }, {
        path: '/viewQuestions',
        title: 'Questions',
        type: 'sub',
        icontype: 'history',
        children: [
            { path: 'fillInBlanks', title: 'Fill in the blanks', ab: '' }

        ]
    }, {
        path: '/settings',
        title: 'Settings',
        type: 'sub',
        icontype: 'settings',
        children: [
            { path: 'accountDetails', title: 'Account details', ab: '' },
            { path: 'services', title: 'Services', ab: '' }
            // { path: 'workingHours', title: 'Working Hours', ab: '' },
            // { path: 'breaks', title: 'Breaks', ab: '' }
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    compactSidebar: boolean;

    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void  {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        setTimeout(() => { Ps.update(elemSidebar) }, 350);
      }
    }
    isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
      }
      return bool;
    }
}
