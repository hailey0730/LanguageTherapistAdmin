import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';

import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './fillInBlanks.component.html'
    // styleUrls: []
})
export class FillInBlanksComponent implements OnInit, AfterViewInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public age: any;
    public results: any[];
    public beginDate: any;
    public endDate: any;

    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {
      
    }
    ngAfterViewInit() {
       
    }

    searchHistory(){
        console.log($('#keyword').val());
        console.log(this.age);
        console.log(this.beginDate);
        console.log(this.endDate);

    }

// dateRangeChanged callback function called when the user apply the date range. This is
// mandatory callback in this option. There are also optional inputFieldChanged and
// calendarViewChanged callbacks.
onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc

    this.beginDate = event.beginDate;
    this.endDate = event.endDate;

}
   
}
