import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './accountDetails.component.html',
    styleUrls: [],
    providers: [appService]
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
       // set value of the input fields
      
    }
    
    ngAfterViewInit() {
       
    }

   
}
