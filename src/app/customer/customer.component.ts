import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as moment from 'moment';
// import 'moment/locale/pt-br';
import * as Ps from 'perfect-scrollbar';
import { appService } from '../app.service';
import { Booking } from '../bookingSystem/booking';
import { CalendarComponent } from '../calendar/calendar.component';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: 'customer.component.html',
    styleUrls: ['./css/customer.css'],
    providers: [
        appService, Booking, CalendarComponent
    ]
})

export class CustomerComponent implements OnInit,AfterViewInit{
    adminName = "Tania Andrew";
    fiveYearsBefore = 2017 - 5;
    fiveYearsAfter = 2017 + 5;
    public customers: any[];        //customers info
    public displayCust:any;         //customer to be shown on right
    public appointments: any;        //appointments to be shown on right
    public cost = 0;                //cost of appointments to be shown on right
    //all customers'appointments arrays
    // public allApts: any[] = [];

   
    weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    services = [{ "service": "some service1", "cost": 150, "duration": 30 }, { "service": "some service2", "cost": 240, "duration": 60 }]
    public adminPic: string;
    eventListlink = 'http://testingtesttest.000webhostapp.com/eventList.php';
    private admininfoLink = 'http://testingtesttest.000webhostapp.com/adminInfo.php';
    private customersLink = 'http://testingtesttest.000webhostapp.com/customer.php';

    constructor(private appService: appService, private Booking: Booking, private CalendarComponent: CalendarComponent) {

    }
    
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
        var today = new Date();
        // console.log(today.toISOString());       //date can be stored in json in this form
        // console.log(new Date(today.toISOString()));     //need to create new Date when get them and before use
        // console.log(new Date("2017-12-14T15:00:00.448Z"));      //testing 

        //below might needed in calendar to convert immediate displayable date in event obj
        var aptdate = this.weekday[today.getDay()] + " " + today.getDate() + " " + this.month[today.getMonth()] + " " + today.getFullYear();

        var tempWkHr = this.Booking.calculateWorkingHours(this.Booking.businessHours, this.Booking.breakTime);
        this.Booking.workingHours = tempWkHr.workingHours;
        this.Booking.workdays = tempWkHr.workDays;
        
        
        this.appService.getJson(this.eventListlink).then((data) => {
            this.appointments = data;
            for (var i = 0; i < this.appointments.length; i++) {
                // var tempstart = new Date(this.appointments[i].start);
                var tempstart = new Date(parseInt(this.appointments[i].start.substring(0, 4)), parseInt(this.appointments[i].start.substring(5, 7)), parseInt(this.appointments[i].start.substring(8, 10)), parseInt(this.appointments[i].start.substring(11, 13)), parseInt(this.appointments[i].start.substring(14, 16)));
                // var tempend = new Date(this.appointments[i].end);
                var tempend = new Date(parseInt(this.appointments[i].end.substring(0, 4)), parseInt(this.appointments[i].end.substring(5, 7)), parseInt(this.appointments[i].end.substring(8, 10)), parseInt(this.appointments[i].end.substring(11, 13)), parseInt(this.appointments[i].end.substring(14, 16)));
                this.appointments[i].start = tempstart;
                this.appointments[i].end = tempend;

            }
        });

        // default get the first customer
        // this.customersLink + '?CustomerID=201'       //to get specific customer
        this.appService.getJson(this.customersLink + '?CustomerID=0').then((data) => {
            console.log(data);
            this.customers = data;
                    
            // this.displayCust = data;       //if use specific customer link
            this.displayCust = this.customers[0];       //default show the first customer
            for(var i = 0; i < this.appointments.length; i ++){     //calculate cost of appointments
                this.cost += this.appointments[i].cost;
            }
            
            setTimeout(function () { $('#subsidebar-0').addClass('selected'); }, 1000);     //need to wait till customers are loaded on the subsidebar
           
            this.adminPic = this.displayCust.img == "" ? "../../assets/img/placeholder.jpg" : this.displayCust.img;

            this.displayCust.img != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');
        });

    }

    ngAfterViewInit() {

    }

    update() {
        swal({
            title: "Profile changed",
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            this.displayCust.img = $('#pic').val() == "" ? this.displayCust.img : $('#pic').val();
            this.displayCust.name = $('#name').val();
            this.displayCust.phone = $('#phone').val();
            this.displayCust.mobile = $('#mobile').val();
            this.displayCust.email = $('#email').val();
            this.displayCust.address = $('#addr').val();
            this.displayCust.city = $('#city').val();
            this.displayCust.country = $('#country').val();

            console.log(this.displayCust);        //DEBUG

            for(var i = 0; i < this.customers.length; i ++){
                if(this.customers[i].id == this.displayCust.id){
                    this.customers[i] = this.displayCust;
                }
            }
            console.log(this.customers);
            // update info to DB
            // var updateAdmin = { "Admin": this.admin };
            // this.appService.postJson(this.admininfoPostLink, updateAdmin);

        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        })
    }

    addApt(){
        var self = this;
        var today = new Date();
        var selecthtml = '';
        for (var i = 0; i < this.CalendarComponent.services.length; i++) {
            selecthtml += '<option value="';
            selecthtml += this.CalendarComponent.services[i].service;
            selecthtml += '" >';
            selecthtml += this.CalendarComponent.services[i].service;
            selecthtml += '</option>';
        }

        swal({
            title: 'Make an appointment',
            html: '<input class="form-control" placeholder="Staff" id="staff" value="' + this.adminName + '" readonly>' +
            '<div class="row">' +
            '<label style="margin-right:5px">Service</label>' +
            '<select id="service">' +
            '<option value="" disabled selected> Select a service </option>' +
            selecthtml +
            '</select>' +
            '</div>' +
            '<div class="row">' +
            '<label style="margin-right:5px">Start time</label>' +
            '<input type="date" name="input" id="dateFrom" value="' + moment(today).format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + this.fiveYearsBefore + '-01-01" max="' + this.fiveYearsAfter + '-12-31" required />' +
            '<input type="time" name="input" id="timeFrom" value="' + moment(today).format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
            '</div>' +
            '<input class="form-control" placeholder="Note" id="note">' +
            '<div class="row">' +
            '<input type="checkbox" name="recur" required/>' + 'Recurring' +
            '</div>' +
            '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;">' + 'Annually(3 years)' +
            '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;">' + 'Monthly(6 months)' +
            '<input type="radio" name= "optionsRadios" value="weekly" style="margin-left:8px;">' + 'Weekly(5 weeks)' +
            '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;">' + 'Daily(7 days)',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (result: any) {
            const dateFrom = $('#dateFrom').val();
            var start = new Date(parseInt(dateFrom.substring(0, 4)), parseInt(dateFrom.substring(5, 7)) - 1, parseInt(dateFrom.substring(8, 10)));
            console.log(start.getDay());
            console.log(self.Booking.workdays);
            if (self.Booking.workdays.indexOf(start.getDay()) != -1) {
                
                self.processBookingInput({});
            } else {               //end of check on weekdays
                swal(
                    "Failed to add event",
                    "We are closed",
                    'warning'
                )
            }

        });
    }

    viewApt(id){
        
        var event;
        var temp = this.loadRecur(id,this.appointments);
        for(var i = 0; i < this.appointments.length; i ++){
            if(this.appointments[i].id == id){
                event = this.appointments[i];
            }
        }
        var selecthtml = '';
        for (var i = 0; i < this.services.length; i++) {
            selecthtml += '<option value="';
            selecthtml += this.services[i].service;
            if (event.title == this.services[i].service) {
                selecthtml += '" selected >';

            } else {
                selecthtml += '" >';

            }
            selecthtml += this.services[i].service;
            selecthtml += '</option>';
        }
        // event.start.toISOString().substring(0, 10)       //if moment not work, "YYYY-MM-DD"
        // event.start.toTimeString().substring(0, 8)       //"HH:mm:ss"
        swal({
            title: 'Make an appointment',
            html: '<input class="form-control" placeholder="Staff" id="staff" value="' + event.staff + '" readonly>' +
            '<div class="row">' +
            '<label style="margin-right:5px">Service</label>' +
            '<select id="service">' +
            '<option value="" disabled> Select a service </option>' +
            selecthtml +
            '</select>' +
            '</div>' +
            '<div class="row">' +
            '<label style="margin-right:5px">Start time</label>' +
            '<input type="date" name="input" id="dateFrom" value="' + moment(event.start).format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + this.fiveYearsBefore + '-01-01" max="' + this.fiveYearsAfter + '-12-31" required />' +
            '<input type="time" name="input" id="timeFrom" value="' + moment(event.start).format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
            '</div>' +
            '<input class="form-control" placeholder="Note" id="note" value="' + event.note + '">' +
            '<div class="row">' +
            '<input type="checkbox" name="recur" ' + temp.recur + ' required/>' + 'Recurring' +
            '</div>' +
            '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;" ' + temp.annually + '> Annually(3 years)' +
            '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;" ' + temp.monthly + '> Monthly(6 months)' +
            '<input type="radio" name= "optionsRadios" value="weekly" style="margin-left:8px;"' + temp.weekly + '>' + 'Weekly(5 weeks)' +
            '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;" ' + temp.daily + '> Daily(7 days)',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: '<i class="material-icons">delete </i> Delete',
            buttonsStyling: false
        }).then((result) => {
           
            if (event.staff == this.adminName) {
                this.processBookingInput(event);
            } else {
                swal(
                    "Failed to edit event",
                    "This event is created by other staff",
                    'warning'
                );
            }

            

        }, function (dismiss) {

            if (dismiss === 'cancel') {
                // delete this event
                // this.CalendarComponent.deleteEventList(event.id);
                // console.log(self.eventList);        //DEBUG
            }
        });
    }

    addCustomer(){

        var newCustInfo = {
            "id": 0,
            "img": "../../assets/img/placeholder.jpg",
            "name": "",
            "phone": "",
            "mobile": '',
            "email": "",
            "address": "",
            "city": "",
            "country": ""

        };

        this.Booking.addNew("Customer", this.Booking.custStaffHtmlTemp, newCustInfo,this.customers);
        // var self = this;
        // swal({
        //     title: 'Add New Customer',
        //     html: '<input class="form-control" placeholder="Name" id="newName" >' +
        //     '<input class="form-control" placeholder="E-mail" type="email" id="newEmail" >' + 
        //     '<input class="form-control" placeholder="Mobile" type="tel" id="newMobile" >',
        //     showCancelButton: true,
        //     confirmButtonClass: 'btn btn-success',
        //     cancelButtonClass: 'btn btn-danger',
        //     buttonsStyling: false
        // }).then(function (result: any) {

        //     var name = $('#newName').val();
        //     var email = $('#newEmail').val();
        //     var mobile = $('#newMobile').val();
        //     console.log(name);
        //     console.log(email);
        //    console.log(mobile);
        //    const randomID = "104";

           

        //    self.customers.push(newCustInfo);

        //    var newCustApt = {
        //        "id": randomID, "appointments": []};

        //     self.allApts.push(newCustApt);

            // update DB

        // });
    }

    removeCust(event, id){
        for(var i = 0; i < this.customers.length; i ++){
            if(this.customers[i].id == id){
                this.customers.splice(i, 1);
                if(this.displayCust.id == id){
                    this.displayCust = this.customers[0];
                    $('li').removeClass('selected');
                    $('#subsidebar-0').addClass('selected');
                }
            }
        }

        // maybe not removing appointments immediately
        // for(var i = 0; i < this.allApts.length; i ++){
        //     if(this.allApts[i].id == id){
        //         this.allApts.splice(i,1);
        //     }
        // }
    }

    displayCustomer(event, id){
        // unhighlight all
        $('li').removeClass('selected');

        // highlight selected
        var li = event.target.closest('li');
        $(li).addClass('selected');
        var customer = $(event.target).text();
        console.log(customer);

        // change view
        // this.customersLink + '?CustomerID=201'       //to get specific customer
        // this.appService.getJson(this.customersLink + '?CustomerID=' + id).then((data) => {
        //     console.log(data);
        //     this.displayCust =data;
        // });

        // below is faster, will load part of array to be able to show on left
        // and switch view will loop through the short array
        for(var i = 0; i < this.customers.length; i ++){
            if(this.customers[i].id == id){
                this.displayCust = this.customers[i];
                break;
            }
        }

        // for(var i = 0; i < this.allApts.length; i ++){
        //     if(this.allApts[i].id == id){
        //         this.appointments = this.allApts[i].appointments;
        //         break;
        //     }
        // }
        this.cost = 0;
        for(var i = 0; i < this.appointments.length; i ++){
            this.cost += this.appointments[i].cost;
        }
        
    }

    loadRecur(id,list) {
        var obj: any;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                if (list[i]['recur']) {
                    obj = list[i]['daily'] ? { recur: 'checked', annually: '', monthly: '', weekly: '', daily: 'checked' } : list[i]['weekly'] ? {
                        recur: 'checked', annually: '', monthly: '', weekly: 'checked', daily: ''
                    } : list[i]['monthly'] ? { recur: 'checked', annually: '', monthly: 'checked', weekly: '', daily: '' } : { recur: 'checked', annually: 'checked', monthly: '', weekly: '', daily: '' }

                } else {
                    obj = { recur: '', annually: '', monthly: '', weekly: '', daily: '' };
                }
                return obj;
            }
        }
    }

    processBookingInput(event){
        var self = this;
        const adminName = 'Tania Andrew';
        let eventData;
        const staff = $('#staff').val();
        const event_title = $('#service').val();
        const note = $('#note').val();
        const dateFrom = $('#dateFrom').val();
        const dateTo = $('#dateFrom').val();
        const timeFrom = $('#timeFrom').val();
        const timeTo = $('#timeFrom').val();
        const recur = $('input[name = "recur"]:checked').val();
        const freq = $('input[name = "optionsRadios"]:checked').val();
        // console.log(result);    //DEBUG: boolean
        // DEBUG:===============
        // console.log(staff);
        // console.log(event_title);
        // console.log(note);
        // console.log(dateFrom);
        // console.log(dateTo);
        // console.log(timeFrom);
        // console.log(timeTo);
        // console.log(recur);
        // console.log(freq);
        // console.log(start);
        // console.log(end);
        // ====================
        var cost = 0;
        var duration = 0;
        for (var i = 0; i < self.services.length; i++) {
            if (event_title == self.services[i].service) {
                cost = self.services[i].cost;
                duration = self.services[i].duration;
            }
        }

        var timeFromHour = parseInt(timeFrom.substring(0, 2));
        var timeFromMin = parseInt(timeFrom.substring(3, 5));
        var timeToHour = parseInt(timeTo.substring(0, 2));
        var timeToMin = parseInt(timeTo.substring(3, 5)) + duration;
        // console.log(timeToMin);
        for (var i = 0; i < self.Booking.workingHours.length; i += 2) {
            var temp1 = self.Booking.workingHours[i].start;
            var temp2 = self.Booking.workingHours[i].end;
            var temp3 = self.Booking.workingHours[i + 1].start;
            var temp4 = self.Booking.workingHours[i + 1].end;

            var morningFromHour = parseInt(temp1.substring(0, 2));
            var morningFromMin = parseInt(temp1.substring(3, 5));
            var morningToHour = parseInt(temp2.substring(0, 2));
            var morningToMin = parseInt(temp2.substring(3, 5));

            var afternoonFromHour = parseInt(temp3.substring(0, 2));
            var afternoonFromMin = parseInt(temp3.substring(3, 5));
            var afternoonToHour = parseInt(temp4.substring(0, 2));
            var afternoonToMin = parseInt(temp4.substring(3, 5));

            var closed = self.Booking.checkClosed(timeFromHour, timeFromMin, timeToHour, timeToMin, morningFromHour, morningFromMin, morningToHour, morningToMin, afternoonFromHour, afternoonFromMin, afternoonToHour, afternoonToMin);
            console.log(timeFromHour);
            if (closed) {
                swal(
                    "Failed to add event",
                    "We are closed at that time",
                    'warning'
                );
            } else if (event_title) {

                var times = recur != 'on' ? 1 : freq == 'annually' ? 3 : freq == 'monthly' ? 6 : freq == 'weekly' ? 5 : freq == 'daily' && 7;

                var id = 0;
                var start: any;
                var end: any;
                if (event.id == null) {       //create new
                    id = Math.floor(Math.random() * 1000);
                    start = new Date(parseInt(dateFrom.substring(0, 4)), parseInt(dateFrom.substring(5, 7)) - 1, parseInt(dateFrom.substring(8, 10)));
                    end = new Date(parseInt(dateTo.substring(0, 4)), parseInt(dateTo.substring(5, 7)) - 1, parseInt(dateTo.substring(8, 10)));
                } else {                      //edit existing 
                    id = event.id;
                    //if recurring, get the first date of recur
                    for (var i = 0; i < self.appointments.length; i++) {
                        if (self.appointments[i].id == event.id && start == null) {
                            start = self.appointments[i].start;
                            end = self.appointments[i].end;
                            break;
                        }
                    }
                    self.Booking.deleteEvent(event.id, self.appointments);

                }
                
                var k = 0;
                for (var i = 0; i < times; i++) {

                    var temp = self.Booking.custStartCustEnd(start.getFullYear(), start.getMonth(), start.getDate(), timeFromHour, timeFromMin, end.getFullYear(), end.getMonth(), end.getDate(), timeToHour, timeToMin, times, i, k, this.Booking.workdays);

                    var customStart = temp.start;
                    var customEnd = temp.end;
                    var displayDate = this.weekday[customStart.getDay()] + " " + customStart.getDate() + " " + this.month[customStart.getMonth()] + " " + customStart.getFullYear();
                    var displayTime = moment(customStart).format("HH:mm") + " - " + moment(customEnd).format("HH:mm");
                    var customClass = temp.class;
                    var r = temp.recur;
                    var d = temp.daily;
                    var w = temp.weekly;
                    var m = temp.monthly;
                    var a = temp.annually;
                    k = temp.K;
                    // console.log(k);
                    console.log(customStart);
                    console.log(customEnd);

                    eventData = {
                        id: id,        //same for recurring events
                        staff: staff,
                        title: event_title,
                        note: note,
                        start: customStart,
                        end: customEnd,
                        displayDate: displayDate,
                        displayTime: displayTime,
                        // customer: ,
                        duration: duration,
                        cost: cost,
                        className: customClass,     //color of the event (once:green, daily:azure,monthly:orange,annually:red)
                        recur: r,
                        daily: d,
                        weekly: w,
                        monthly: m,
                        annually: a,
                        order: i
                    };

                    self.appointments.push(eventData);

                }
                // for (var i = 0; i < this.allApts.length; i++) {
                //     if (this.allApts[i].id == id) {
                //         this.allApts[i].appointments = this.appointments;
                //         break;
                //     }
                // }

                this.cost = 0;
                for (var i = 0; i < this.appointments.length; i++) {
                    this.cost += this.appointments[i].cost;
                }


            } else {
                swal(
                    "Failed to add event",
                    "You haven't fill in the event title yet. Please try again.",
                    'warning'
                )
            }

        }           //end of for workingHours
    }
  
}