import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';

import * as Chartist from 'chartist';
import { appService } from '../app.service'
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { Observable } from "rxjs/Observable";
import { CommonModule } from '@angular/common';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./css/dashboard.css'],
  providers: [
      appService
  ] 
})
export class DashboardComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService){

    }
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData: TableData;
  public figures: any[];
  public eventList: any[];
  public todayDate = new Date();
  public today: any = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  public beginDate: any = { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()};
  public endDate: any;
  public overall: boolean = false;
  myDateRangePickerOptions: IMyDrpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
  };
  private testlink = "http://hayhay0730.000webhostapp.com/test.php";
  private eventListlink = 'http://testingtesttest.000webhostapp.com/eventList.php';

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    
        //==================================top 4 figures=================================
        //   console.log('outside promise');  //DEBUG
        //   this.appService.getJson(this.testlink).then((data) => {
        //     this.figures = data;
        //     // console.log(this.figures);  //DEBUG
        //   });

      this.figures = [                   //testing purpose
          {
              "backgroundColor": "green",
              "bigIcon": "store",
              "category": "Appointments",
              "number": "12",
              "smallIcon": "increase",
              "smallText": "3%"
          },
          {
              "backgroundColor": "red",
              "bigIcon": "equalizer",
              "category": "Confirmed Payment",
              "number": "$320",
              "smallIcon": "increase",
              "smallText": "5%"
          },
          {
              "backgroundColor": "red",
              "bigIcon": "equalizer",
              "category": "Total Estimated",
              "number": "$1200",
              "smallIcon": "decrease",
              "smallText": "1%"
          }
      ]

    // this.appService.getJson(this.eventListlink).then((data) => {
    //     this.eventList = data;
    //     console.log(this.eventList);
    // });
      this.eventList = [

          {
              "id": 101,
              "staff": "Tania Andrew",
              "title": "All Day Event",
              "note": "",
              "start": "2017-11-18T08:00:00",
              "end": "2017-11-18T09:00:00",
              "displayDate": "Mon 18 Dec 2017",
              "displayTime": "08:00am - 09:00am",
              "customer": "Customer A",
              "duration": 60,
              "cost": 300,
              "className": "event-default",
              "recur": false,
              "daily": false,
              "monthly": false,
              "annually": false,
              "order": 0,
              "complete": true
          },
          {
              "id": 999,
              "staff": "Tania Andrew",
              "title": "Repeating Event",
              "note": "",
              "start": "2017-11-07T08:30:00",
              "end": "2017-11-07T10:00:00",
              "displayDate": "Thu 11 Dec 2017",
              "displayTime": "08:30am - 10:00am",
              "customer": "Customer B",
              "duration": 90,
              "cost": 450,
              "allDay": false,
              "className": "event-rose",
              "recur": true,
              "daily": true,
              "monthly": false,
              "annually": false,
              "order": 0,
              "complete": true
          },
          {
              "id": 999,
              "staff": "Tania Andrew",
              "title": "Repeating Event",
              "note": "",
              "start": "2017-11-08T08:30:00",
              "end": "2017-11-08T10:00:00",
              "displayDate": "Fri 08 Dec 2017",
              "displayTime": "08:30am - 10:00am",
              "customer": "Customer B",
              "duration": 90,
              "cost": 450,
              "allDay": false,
              "className": "event-rose",
              "recur": true,
              "daily": true,
              "monthly": false,
              "annually": false,
              "order": 1,
              "complete": true
          },
          {
              "id": 999,
              "staff": "Tania Andrew",
              "title": "Repeating Event",
              "note": "",
              "start": "2017-11-11T08:30:00",
              "end": "2017-11-11T10:00:00",
              "displayDate": "Mon 11 Dec 2017",
              "displayTime": "08:30am - 10:00am",
              "customer": "Customer B",
              "duration": 90,
              "cost": 450,
              "allDay": false,
              "className": "event-rose",
              "recur": true,
              "daily": true,
              "monthly": false,
              "annually": false,
              "order": 2,
              "complete": true
          },
          {
              "id": 999,
              "staff": "Tania Andrew",
              "title": "Repeating Event",
              "note": "",
              "start": "2017-11-12T08:30:00",
              "end": "2017-11-12T10:00:00",
              "displayDate": "Tue 12 Dec 2017",
              "displayTime": "08:30am - 10:00am",
              "customer": "Customer B",
              "duration": 90,
              "cost": 450,
              "allDay": false,
              "className": "event-rose",
              "recur": true,
              "daily": true,
              "monthly": false,
              "annually": false,
              "order": 3,
              "complete": true
          },
          {
              "id": 201,
              "staff": "Tania Andrew",
              "title": "Lunch",
              "note": "",
              "start": "2017-11-20T14:00:00",
              "end": "2017-11-20T15:00:00",
              "displayDate": "Wed 20 Dec 2017",
              "displayTime": "02:00pm - 03:00pm",
              "customer": "Customer C",
              "duration": 60,
              "cost": 300,
              "allDay": false,
              "className": "event-red",
              "recur": false,
              "daily": false,
              "monthly": false,
              "annually": false,
              "order": 0,
              "complete": true
          },
          {
              "id": 501,
              "staff": "Tania Andrew",
              "title": "Birthday Party",
              "note": "",
              "start": "2017-11-25T16:00:00",
              "end": "2017-11-25T17:00:00",
              "displayDate": "Mon 25 Dec 2017",
              "displayTime": "04:00pm - 05:00pm",
              "customer": "Customer A",
              "duration": 60,
              "cost": 300,
              "allDay": false,
              "className": "event-azure",
              "recur": false,
              "daily": false,
              "monthly": false,
              "annually": false,
              "order": 0,
              "complete": false
          }
      ];
   }
   
   ngAfterViewInit() {
      
       //  Activate the tooltips
       $('[rel="tooltip"]').tooltip();
   }


   // dateRangeChanged callback function called when the user apply the date range. This is
   // mandatory callback in this option. There are also optional inputFieldChanged and
   // calendarViewChanged callbacks.
   onDateRangeChanged(event: IMyDateRangeModel) {
       // event properties are: event.beginDate, event.endDate, event.formatted,
       // event.beginEpoc and event.endEpoc

       this.overall = false;

       this.beginDate = event.beginDate;
       this.endDate = event.endDate;
       console.log(this.beginDate);
       console.log(this.endDate);

    //    update content 
    //update top 4 figures
       this.appService.getJson(this.testlink).then((data) => {
        //    this.figures = data;
           // console.log(this.figures);  //DEBUG
       });

       //update right 2 figures


   }

   showOverall(){
    this.overall = true;

    //    update content 
    //update top 4 figures
    this.appService.getJson(this.testlink).then((data) => {
        // this.figures = data;
        // console.log(this.figures);  //DEBUG
    });

       //update right 2 figures

   }

   showThisMonth(){
       this.overall = false;
       this.beginDate = this.today;
       this.appService.getJson(this.testlink).then((data) => {
           // this.figures = data;
           // console.log(this.figures);  //DEBUG
       });

       //update right 2 figures

   }

   addAppointment(){
    //    swal({
    //        title: 'Make an appointment',
    //        html: '<input class="form-control" placeholder="Staff" id="staff" value="' + adminName + '" readonly>' +
    //        '<div class="row">' +
    //        '<label style="margin-right:5px">Service</label>' +
    //        '<select id="service">' +
    //        '<option value="" disabled selected> Select a service </option>' +
    //        selecthtml +
    //        '</select>' +
    //        '</div>' +
    //        '<div class="row">' +
    //        '<label style="margin-right:5px">Start time</label>' +
    //        '<input type="date" name="input" id="dateFrom" value="' + start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required/>' +
    //        '<input type="time" name="input" id="timeFrom" value="' + start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
    //        '</div>' +
    //        '<input class="form-control" placeholder="Note" id="note">' +
    //        '<div class="row">' +
    //        '<input type="checkbox" name="recur" required/>' + 'Recurring' +
    //        '</div>' +
    //        '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;">' + 'Annually(3 years)' +
    //        '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;">' + 'Monthly(6 months)' +
    //        '<input type="radio" name= "optionsRadios" value="weekly" style="margin-left:8px;">' + 'Weekly(5 weeks)' +
    //        '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;">' + 'Daily(7 days)',
    //        showCancelButton: true,
    //        confirmButtonText: 'Add Customer',
    //        confirmButtonClass: 'btn btn-success',
    //        cancelButtonClass: 'btn btn-danger',
    //        buttonsStyling: false
    //    }).then(function (result: any) {

    //        self.processBookingInput({});
    //    });
   }
   
}
