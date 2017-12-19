import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './services.component.html',
    styleUrls: ['../css/subsidebar.css'],
    providers: [appService]
})
export class ServicesComponent implements OnInit, AfterViewInit {
    

    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {

        $("form").on('mouseover', '.row', function (event) {
            var weekday = $(event.target).children()[0];
            var i = weekday == 'Monday'?0:weekday == 'Tuesday'?1:weekday == 'Wednesday'?2:weekday == 'Thursday'?3:weekday == 'Friday'?4:weekday == 'Saturday'?5:6;
            var row = event.target.closest('.row');
            $(row).css('background-color', '#fdeeff');
       
        });

        $("form").on('mouseout', '.row', function (event) {
            var weekday = $(event.target).children()[0];
            var i = weekday == 'Monday' ? 0 : weekday == 'Tuesday' ? 1 : weekday == 'Wednesday' ? 2 : weekday == 'Thursday' ? 3 : weekday == 'Friday' ? 4 : weekday == 'Saturday' ? 5 : 6;
            var row = event.target.closest('.row');
            $(row).css('background-color', 'white');
            
        });
    }
    
    ngAfterViewInit() {
        
    }

   
}
