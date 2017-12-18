// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as moment from 'moment';
// import { NgModel } from '@angular/forms';

import { appService } from '../app.service';
import { Booking } from '../bookingSystem/booking';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-calendar-cmp',
    templateUrl: 'calendar.component.html',
    styleUrls: [],      
    providers:[
        appService, Booking
    ]
})

export class CalendarComponent implements OnInit, AfterViewInit {
    
    constructor(private appService: appService, private Booking: Booking) {

    }
    today = new Date();
    y = this.today.getFullYear();
    m = this.today.getMonth();
    d = this.today.getDate();

    eventListlink = 'http://testingtesttest.000webhostapp.com/eventList.php';
    public eventList = [];
    public renderList = [];
    public businessHours = [ // specify an array instead
        {
            dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
            start: '08:00', // 8am
            end: '18:00' // 6pm
        }
    ];
    public breakTime = [ // specify an array instead
        {
            dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
            start: '12:00',
            end: '13:30'
        }
    ];
    public workingHours = [];
    public workdays = [];
    public adminList = [];

    public JohnList =
    [{
        id: 601,
        staff: 'John',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 2, 19, 0),
        end: new Date(this.y, this.m, this.d + 2, 22, 30),
        allDay: false,
        className: 'event-green',
        recur: true,
        daily: false,
        monthly: false,
        annually: false
    }, {
        id: 601,
        staff: 'John',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 3, 19, 0),
        end: new Date(this.y, this.m, this.d + 3, 22, 30),
        allDay: false,
        className: 'event-green',
        recur: true,
        daily: false,
        monthly: false,
        annually: false
    }, {
        id: 601,
        staff: 'John',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 4, 19, 0),
        end: new Date(this.y, this.m, this.d + 4, 22, 30),
        allDay: false,
        className: 'event-green',
        recur: true,
        daily: false,
        monthly: false,
        annually: false
    }];

    public MaryList =
    [{
        id: 601,
        staff: 'Mary',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 2, 19, 0),
        end: new Date(this.y, this.m, this.d + 2, 22, 30),
        allDay: false,
        className: 'event-orange',
        recur: true,
        daily: false,
        monthly: false,
        annually: false
    }, {
        id: 601,
        staff: 'Mary',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 3, 19, 0),
        end: new Date(this.y, this.m, this.d + 3, 22, 30),
        allDay: false,
        className: 'event-orange',
        recur: true,
        daily: false,
        monthly: false,
        annually:false
    }, {
        id: 601,
        staff: 'Mary',
        title: 'Testing other user view',
        note: '',
        start: new Date(this.y, this.m, this.d + 4, 19, 0),
        end: new Date(this.y, this.m, this.d + 4, 22, 30),
        allDay: false,
        className: 'event-orange',
        recur: true,
        daily: false,
        monthly: false,
        annually:false
    }];

    // ==========end of testing events==================

    selectedUsers: string[];        //users'views

    selectTheme = 'primary';
    users = [
        { value: 'Tania' },
        { value: 'John' },
        { value: 'Mary' }
    ];

    services = [{"service":"some service1", "cost":150, "duration":30}, {"service":"some service2", "cost":240, "duration":60}]

    ngOnInit() {
        
        var temp = this.Booking.calculateWorkingHours(this.businessHours, this.breakTime);
        this.Booking.workingHours = temp.workingHours;
        this.Booking.workdays = temp.workDays;
        
        const $calendar = $('#fullCalendar');
        const adminName = 'Tania Andrew';

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();      //need to add 1
        const d = today.getDate();

        const fiveYearsAfter = y + 5;
        const fiveYearsBefore = y - 5;
        
        
        $calendar.fullCalendar({
            viewRender: function(view: any, element: any) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name !== 'month') {
                    const $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
            },
            header: {
                left: 'prev, next, title, prevYear, nextYear',
                center: 'month, agendaWeek, agendaDay',
                right: 'today'
            },
            defaultDate: today,
            defaultView:'agendaWeek',
            selectable: true,
            selectHelper: true,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: ' MMMM D YYYY'
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            }, 
            businessHours: this.Booking.workingHours, //this.businessHours,
            eventConstraint: "businessHours",

            select: (start: any, end: any)=> {
                var self = this;
                // on select we show the Sweet Alert modal with an input
                if (self.Booking.workdays.indexOf(start.day()) != -1) {
                   var selecthtml = '';
                   for(var i = 0; i < self.services.length; i ++){
                       selecthtml += '<option value="'; 
                       selecthtml += self.services[i].service;
                       selecthtml += '" >';
                       selecthtml += self.services[i].service;
                       selecthtml += '</option>';
                   }

               

                swal({
                    title: 'Make an appointment',
                    html: '<input class="form-control" placeholder="Staff" id="staff" value="' + adminName + '" readonly>' +
                    '<div class="row">' +
                    '<label style="margin-right:5px">Service</label>' +
                    '<select id="service">' +
                    '<option value="" disabled selected> Select a service </option>' +
                    selecthtml +
                    '</select>' +
                    '</div>' +
                    '<div class="row">' +
                    '<label style="margin-right:5px">Start time</label>' +
                    '<input type="date" name="input" id="dateFrom" value="' + start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required/>' +
                    '<input type="time" name="input" id="timeFrom" value="' + start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '<input class="form-control" placeholder="Note" id="note">' +
                    '<div class="row">' +
                    '<input type="checkbox" name="recur" required/>' + 'Recurring' +
                    '</div>' + 
                    '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;">' + 'Annually(3 years)' +
                    '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;">' + 'Monthly(6 months)' +
                    '<input type="radio" name= "optionsRadios" value="weekly" style="margin-left:8px;">' + 'Weekly(5 weeks)' +
                    '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;">' + 'Daily(7 days)' ,
                    showCancelButton: true,
                    confirmButtonText:'Add Customer',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result: any) {
                    
                    self.processBookingInput({});

                    // for (var i = 0; i < self.eventList.length; i++) {
                    //     if (self.eventList[i].id == completeEvent.id) {
                    //         self.eventList[i] = completeEvent;
                    //         console.log(self.eventList[i]);
                    //     }
                    // }
                    // for (var i = 0; i < self.adminList.length; i++) {
                    //     if (self.adminList[i].id == completeEvent.id) {
                    //         self.adminList[i] = completeEvent;
                    //     }
                    // }
                    
                    
                    
                    $calendar.fullCalendar('unselect');

                });

            
            }else{               //end of check on weekdays
                swal(
                    "Failed to add event",
                    "We are closed",
                    'warning'
                )
            }
                
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: this.loadEventList(),
            eventClick: (event:any)=> {      //event on click swal edit or remove
                var self = this;
                var temp = self.Booking.loadRecur(event.id, self.eventList);
                var selecthtml = '';
                for (var i = 0; i < self.services.length; i++) {
                    selecthtml += '<option value="';
                    selecthtml += self.services[i].service;
                    if (event.title == self.services[i].service){
                        selecthtml += '" selected >';

                    }else{
                        selecthtml += '" >';
                        
                    }
                    selecthtml += self.services[i].service;
                    selecthtml += '</option>';
                }
                
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
                    '<label style="margin-right:5px;color:black;">Drag to modify date and resize to modify end time</label>' +
                    '<div class="row">' +
                    '<label style="margin-right:5px">Start time</label>' +
                    '<input type="time" name="input" id="timeFrom" value="' + event.start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
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
                    confirmButtonText: 'Add Customer',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    cancelButtonText: '<i class="material-icons">delete </i> Delete',
                    buttonsStyling: false
                }).then((result)=> {
                    console.log(event);
                    if(event.staff == adminName){
                        self.processBookingInput(event);

                        // for (var i = 0; i < self.eventList.length; i++) {
                        //     if (self.eventList[i].id == completeEvent.id) {
                        //         self.eventList[i] = completeEvent;
                        //     }
                        // }
                        // for (var i = 0; i < self.adminList.length; i++) {
                        //     if (self.adminList[i].id == completeEvent.id) {
                        //         self.adminList[i] = completeEvent;
                        //     }
                        // }
                        
                    }else{
                        swal(
                            "Failed to edit event",
                            "This event is created by other staff",
                            'warning'
                        );
                    }


                    $calendar.fullCalendar('unselect');

                },function(dismiss){
                    
                    if (dismiss === 'cancel') {
                        // delete this event
                        $calendar.fullCalendar('removeEvents', event.id);        //some idOrFilter to be removed
                        self.Booking.deleteEvent(event.id, self.eventList);
                        self.Booking.deleteEvent(event.id, self.adminList);
                        // console.log(self.eventList);        //DEBUG
                    }
                });

            },
            eventDrop:  (event, delta, revertFunc)=> {
                var self = this;
                self.customMessagePopUp(revertFunc, event.title + " was dropped on " + event.start.format("YYYY-MM-DD"), event);

            },
            eventResize:  (event, delta, revertFunc)=> {
                var self = this;
                self.customMessagePopUp(revertFunc, event.title + " end is now " + event.end.format("HH:mm"), event);

            }

        });
    }

    ngAfterViewInit(){}

    //show multiple users'views
    changeView(event){
        // console.log(this.selectedUsers);     //DEBUG
        var list = [];
        this.eventList = [];
        for(var i = 0; i < this.selectedUsers.length; i ++){
            list = this.selectedUsers[i] == 'Tania'? this.adminList: this.selectedUsers[i] == 'John'?this.JohnList: this.MaryList;

            for(var j = 0; j < list.length; j ++){
                this.eventList.push(list[j]);
            }

        }
        // console.log(renderList);         //DEBUG
        $('#fullCalendar').fullCalendar('removeEvents');
        // $('#fullCalendar').fullCalendar('renderEvent', renderList,true);         //doesn't work
        $('#fullCalendar').fullCalendar('addEventSource', this.eventList);
    }


    //input:(event){eventObj}
    addCustomer(event) {
        var self = this;
        var placeholderText = event.customer == "" ? "Search existing Customer": event.customer;
        console.log(placeholderText);
        const ipAPI = 'https://api.ipify.org?format=json'       //TESTING PURPOSE
        swal.queue([{
            title: "Customer",
            html: '<input class="form-control" placeholder="'+ placeholderText + '" id="name" >',
            confirmButtonText: 'Search',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonText: 'Add new customer',
            cancelButtonClass: 'btn btn-info',
            buttonsStyling: false,
            preConfirm: (result) => {
                return $.get(ipAPI).then((data) => {
                    // swal.insertQueueStep(data.ip)
                    // show if customer is found
                    console.log($('#name').val());
                    // if $('#name').val() == "" or null and event.customer !="". then event.customer
                })
            }
        }]).then((result)=>{
             //     var customerName = $('#name').val();
        //     //send to backend to search
        //     console.log(customerName);
        //     //if found, add to event 
        //     //else swal not found
        //     swal(
        //         "Cannot find customer",
        //         "Please add new customer",
        //         'warning'
        //     );
           
        }, function(dismiss){
            swal.setDefaults({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3']
            })

            var steps = [
                'Customer Name',
                'Mobile',
                'E-mail'
            ]

            swal.queue(steps).then((result) => {
                swal.resetDefaults()

                if (result) {
                    // swal({
                    //     title: 'All done!',
                    //     html:
                    //     'Your answers: <pre>' +
                    //     JSON.stringify(result.value) +
                    //     '</pre>',
                    //     confirmButtonText: 'Lovely!'
                    // })

                const randomID = 104;

                var newCustInfo = {
                    "id": randomID,
                    "img": "../../assets/img/placeholder.jpg",
                    "name": result[0],
                    "phone": "",
                    "mobile": result[1],
                    "email": result[2],
                    "address": "",
                    "city": "",
                    "country": ""

                };

                var newCustApt = {
                    "id": randomID, "appointments": []
                };

                newCustApt.appointments.push(event);

                // update DB
                // add to event
                event.customer = result[0];
                // self.Booking.deleteEvent(event.id, self.eventList);
                // self.eventList.push(event);
                // self.Booking.deleteEvent(event.id, self.adminList);
                // self.adminList.push(event);
                 for (var i = 0; i < self.eventList.length; i++) {
                    if (self.eventList[i].id == event.id) {
                        self.eventList[i].customer = event.customer;
                        console.log(self.eventList[i].customer);
                        console.log(event.customer);
                    }
                }
                for (var i = 0; i < self.adminList.length; i++) {
                    if (self.adminList[i].id == event.id) {
                        self.adminList[i].customer = event.customer;
                    }
                }
                console.log(self.eventList);
                }
                console.log(result);
            })
        })
        // swal({
        //     title: "Customer",
        //     html: '<input class="form-control" placeholder="'+ placeholderText + '" id="name" >',
        //     showCancelButton: true,
        //     confirmButtonText: 'Search',
        //     confirmButtonClass: 'btn btn-success',
        //     cancelButtonText: 'Add new customer',
        //     cancelButtonClass: 'btn btn-info',
        //     buttonsStyling: false
        // }).then((result) => {
        //     var customerName = $('#name').val();
        //     //send to backend to search
        //     console.log(customerName);
        //     //if found, add to event 
        //     //else swal not found
        //     swal(
        //         "Cannot find customer",
        //         "Please add new customer",
        //         'warning'
        //     );
        // }, function (dismiss) {
        //     swal({
        //         title: 'Add New Customer',
        //         html: '<input class="form-control" placeholder="Name" id="newName" >' +
        //         '<input class="form-control" placeholder="E-mail" type="email" id="newEmail" >' +
        //         '<input class="form-control" placeholder="Mobile" type="tel" id="newMobile" >',
        //         showCancelButton: true,
        //         confirmButtonClass: 'btn btn-success',
        //         cancelButtonClass: 'btn btn-danger',
        //         buttonsStyling: false
        //     }).then(function (result: any) {

        //         var name = $('#newName').val();
        //         var email = $('#newEmail').val();
        //         var mobile = $('#newMobile').val();
        //         console.log(name);
        //         console.log(email);
        //         console.log(mobile);
        //         const randomID = "104";

        //         var newCustInfo = {
        //             "id": randomID,
        //             "img": "../../assets/img/placeholder.jpg",
        //             "name": name,
        //             "phone": "",
        //             "mobile": mobile,
        //             "email": email,
        //             "address": "",
        //             "city": "",
        //             "country": ""

        //         };


        //         var newCustApt = {
        //             "id": randomID, "appointments": []
        //         };

        //         newCustApt.appointments.push(event);

        //         // update DB
        //         // add to event
        //         event.customer = name;
        //         // self.Booking.deleteEvent(event.id, self.eventList);
        //         // self.eventList.push(event);
        //         // self.Booking.deleteEvent(event.id, self.adminList);
        //         // self.adminList.push(event);
        //          for (var i = 0; i < self.eventList.length; i++) {
        //             if (self.eventList[i].id == event.id) {
        //                 self.eventList[i].customer = event.customer;
        //             }
        //         }
        //         for (var i = 0; i < self.adminList.length; i++) {
        //             if (self.adminList[i].id == event.id) {
        //                 self.adminList[i].customer = event.customer;
        //             }
        //         }
        //         console.log(self.eventList);
        //     });
        // });
    
    }


    customMessagePopUp(func, message,event){
        var self = this;
        swal({
            title: message,
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
           
                swal(
                    'Updated!',
                    'Event has been updated.',
                    'success'
                )

                var $calendar = $('#fullCalendar');

                var times = event.recur==false ? 1 : event.annually==true ? 3 : event.monthly==true ? 6 : event.weekly == true? 5:event.daily==true && 7;
                
                self.Booking.deleteEvent(event.id, self.eventList);
                self.Booking.deleteEvent(event.id, self.adminList);

                var temp;
                var k = 0;
                var sy = parseInt(event.start.format().substring(0, 4));
                var sm = parseInt(event.start.format().substring(5, 7)) - 1;
                var sd = parseInt(event.start.format().substring(8, 10));
                var sh = parseInt(event.start.format().substring(11, 13));
                var smin = parseInt(event.start.format().substring(14, 16));
                var ey = parseInt(event.end.format().substring(0, 4));
                var em = parseInt(event.end.format().substring(5, 7)) - 1;
                var ed = parseInt(event.end.format().substring(8, 10));
                var eh = parseInt(event.end.format().substring(11, 13));
                var emin = parseInt(event.end.format().substring(14, 16));
                for (var i = 0; i < times; i++) {
                    if(event.daily){
                        temp = self.Booking.custStartCustEnd(sy, sm, sd - event.order, sh, smin, ey, em, ed - event.order, eh, emin, times, i,k, this.Booking.workdays);
                    }else if(event.weekly){
                        temp = self.Booking.custStartCustEnd(sy, sm, sd - (event.order * 7), sh, smin, ey, em, ed - event.order, eh, emin, times, i, k, this.Booking.workdays);
                    }else if(event.monthly){
                        temp = self.Booking.custStartCustEnd(sy, sm - event.order, sd, sh, smin, ey, em - event.order, ed, eh, emin, times, i,k, this.Booking.workdays);
                    }else if(event.annually){
                        temp = self.Booking.custStartCustEnd(sy - event.order, sm, sd, sh, smin, ey - event.order, em, ed, eh, emin, times, i,k, this.Booking.workdays);
                    }else{
                        temp = self.Booking.custStartCustEnd(sy, sm, sd, sh, smin, ey, em, ed, eh, emin, times, i,k, this.Booking.workdays);
                    }

                    var customStart = temp.start;
                    var customEnd = temp.end;
                    var displayDate = customStart.getDay() + customStart.getDate() + customStart.getMonth() + customStart.getFullYear();
                    var displayTime = moment(customStart).format("HH:mm") + " - " + moment(customEnd).format("HH:mm");
                    k = temp.K;
                    // DEBUG===================
                    // console.log(k);
                    // console.log(temp.start);
                    // console.log(temp.end);
                    // ========================

                    var eventData = {
                        id: event.id,        //same for recurring events
                        staff: event.staff,
                        title: event.title,
                        note: event.note,
                        start: customStart,
                        end: customEnd,
                        displayDate: displayDate,
                        displayTime: displayTime,
                        // customer: event.customer,
                        // duration: ,
                        // cost: ,
                        className: event.className,     //color of the event (once:green, daily:azure,monthly:orange,annually:red)
                        recur: event.recur,
                        daily: event.daily,
                        weekly:event.weekly,
                        monthly: event.monthly,
                        annually: event.annually,
                        order:i
                    };

                    self.eventList.push(eventData);
                    self.adminList.push(eventData);

                    // console.log(eventData);     //DEBUG
                }
                // console.log(this.eventList);        //DEBUG
                $('#fullCalendar').fullCalendar('removeEvents');
                $('#fullCalendar').fullCalendar('addEventSource', this.eventList);
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                func();
            }
        })
    }

    loadEventList(){
        var $calendar = $('#fullCalendar');
        this.appService.getJson(this.eventListlink).then((data) => {
            this.eventList = data;
            for (var i = 0; i < this.eventList.length; i++) {            //"2017-11-18T18:00:00"
                // DEBUG
                // console.log(this.eventList[i].start.substring(0, 4));        //year
                // console.log(this.eventList[i].start.substring(5, 7));        //month need to -1  in json
                // console.log(this.eventList[i].start.substring(8, 10));       //day
                var tempstart = new Date(parseInt(this.eventList[i].start.substring(0, 4)), parseInt(this.eventList[i].start.substring(5, 7)), parseInt(this.eventList[i].start.substring(8, 10)), parseInt(this.eventList[i].start.substring(11, 13)), parseInt(this.eventList[i].start.substring(14, 16)));
                var tempend = new Date(parseInt(this.eventList[i].end.substring(0, 4)), parseInt(this.eventList[i].end.substring(5, 7)), parseInt(this.eventList[i].end.substring(8, 10)), parseInt(this.eventList[i].end.substring(11, 13)), parseInt(this.eventList[i].end.substring(14, 16)));
                this.eventList[i].start = tempstart;
                this.eventList[i].end = tempend;
                this.adminList.push(this.eventList[i]);
               
            }
            
            return this.eventList;
        });

    }

    processBookingInput(event){
        var self = this;
        var $calendar = $('#fullCalendar');
        const adminName = 'Tania Andrew';
        let eventData;
        const staff = $('#staff').val();
        const event_title = $('#service').val();
        // const event_title = $('#input-field').val();
        const note = $('#note').val();
        const dateFrom = $('#dateFrom').val();
        const dateTo = $('#dateFrom').val();
        const timeFrom = $('#timeFrom').val();
        const timeTo = $('#timeFrom').val();
        // const timeTo = $('#timeTo').val();
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
        var customer = event.customer == null? "":event.customer;
        console.log(event);
        console.log(customer);
        console.log(event.customer);
        for (var i = 0; i < self.services.length; i++) {
            if (event_title == self.services[i].service) {
                cost = self.services[i].cost;
                duration = self.services[i].duration;
            }
        }

        var timeFromHour = parseInt(timeFrom.substring(0, 2));
        var timeFromMin = parseInt(timeFrom.substring(3, 5));
        var timeToHour = parseInt(timeTo.substring(0, 2));
        var timeToMin = parseInt(timeTo.substring(3, 5))+duration;
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


            if(closed){
                swal(
                    "Failed to add event",
                    "We are closed at that time",
                    'warning'
                );
            } else if (event_title) {

                var times = recur != 'on' ? 1 : freq == 'annually' ? 3 : freq == 'monthly' ? 6 : freq == 'weekly'?5: freq == 'daily' && 7;

                var id = 0;
                var start: any;
                var end: any;
                if(event.id == null){       //create new
                    id = Math.floor(Math.random() * 1000);
                    start = new Date(parseInt(dateFrom.substring(0, 4)), parseInt(dateFrom.substring(5, 7)) - 1, parseInt(dateFrom.substring(8, 10)));
                    end = new Date(parseInt(dateTo.substring(0, 4)), parseInt(dateTo.substring(5, 7)) - 1, parseInt(dateTo.substring(8, 10)));
                }else{                      //edit existing 
                    id = event.id;
                    //if recurring, get the first date of recur
                    for (var i = 0; i < self.eventList.length; i++) {
                        if (self.eventList[i].id == event.id && start == null) {
                            start = self.eventList[i].start;
                            end = self.eventList[i].end;
                            break;
                        }
                    }
                    self.Booking.deleteEvent(event.id, self.eventList);
                    self.Booking.deleteEvent(event.id, self.adminList);

                    $calendar.fullCalendar('removeEvents', event.id);
                }
                
                var k = 0;
                for (var i = 0; i < times; i++) {

                    var temp = self.Booking.custStartCustEnd(start.getFullYear(), start.getMonth(), start.getDate(), timeFromHour, timeFromMin, end.getFullYear(), end.getMonth(), end.getDate(), timeToHour, timeToMin, times, i, k, this.Booking.workdays);

                    var customStart = temp.start;
                    var customEnd = temp.end;
                    var displayDate = customStart.getDay() + customStart.getDate() + customStart.getMonth() + customStart.getFullYear();
                    var displayTime = moment(customStart).format("HH:mm") + " - " + moment(customEnd).format("HH:mm");
                    var customClass = temp.class;
                    var r = temp.recur;
                    var d = temp.daily;
                    var w = temp.weekly;
                    var m = temp.monthly;
                    var a = temp.annually;
                    k = temp.K;

                    eventData = {
                        id: id,        //same for recurring events
                        staff: staff,
                        title: event_title,
                        note: note,
                        start: customStart,
                        end: customEnd,
                        displayDate: displayDate,
                        displayTime: displayTime,
                        customer: customer,
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

                    
                    self.eventList.push(eventData);
                    self.adminList.push(eventData);

                    // console.log(eventData);     //DEBUG
                    $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true

                    $calendar.fullCalendar('addEventSource', eventData);

                    self.addCustomer(eventData);
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