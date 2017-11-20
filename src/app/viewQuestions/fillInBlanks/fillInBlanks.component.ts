import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';

import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { appService } from '../../app.service';
import { Observable } from "rxjs/Observable";
import { CommonModule } from '@angular/common';

declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './fillInBlanks.component.html',
    styleUrls: ['./css/search.css'],
    providers: [
        appService
    ]
})
export class FillInBlanksComponent implements OnInit, AfterViewInit {
    location: Location;
    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public age: any;
    public results: any[];
    public beginDate: any;
    public endDate: any;

    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    private searchResult = "http://www.drcare.ai/Doctor/php/loadQA.php";

    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {

        //test search result appearance========================================
        this.appService.getJson(this.searchResult).then((data) => {
            this.results = data;

            // console.log(this.results);
        });
      
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

edit(question){

    window.sessionStorage.setItem('questionEdit', question.ID);
    console.log(question);
    window.location.replace('exercises/fillInBlanks');
}
   
}
