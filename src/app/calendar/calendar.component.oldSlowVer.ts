// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit} from '@angular/core';
// import { NgModel } from '@angular/forms';

import { appService } from '../app.service';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-calendar-cmp',
    templateUrl: 'calendar.component.html',
    styleUrls: [],      
    providers:[
        appService
    ]
})

export class CalendarComponent implements OnInit, AfterViewInit {
    
    constructor(private appService: appService) {

    }
    today = new Date();
    y = this.today.getFullYear();
    m = this.today.getMonth();
    d = this.today.getDate();

    eventList = [
        {
            id: 101,
            title: 'All Day Event',
            start: new Date(this.y, this.m, 1, 0, 0),
            end: new Date(this.y, this.m, 1, 23, 59),
            className: 'event-default',
            recur: false,
            daily: false,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m,this.d - 4, 6, 0),
            end: new Date(this.y, this.m, this.d - 4, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d - 3, 6, 0),
            end: new Date(this.y, this.m, this.d - 3, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d - 2, 6, 0),
            end: new Date(this.y, this.m, this.d - 2, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d - 1, 6, 0),
            end: new Date(this.y, this.m, this.d - 1, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d, 6, 0),
            end: new Date(this.y, this.m, this.d, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d + 1, 6, 0),
            end: new Date(this.y, this.m, this.d +1, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(this.y, this.m, this.d + 2, 6, 0),
            end: new Date(this.y, this.m, this.d +2, 8, 0),
            allDay: false,
            className: 'event-rose',
            recur: true,
            daily: true,
            monthly: false,
            annually:false
        },
        {
            id: 301,
            title: 'Meeting',
            start: new Date(this.y, this.m, this.d - 1, 10, 30),
            end: new Date(this.y, this.m, this.d-1,11,0),
            allDay: false,
            className: 'event-green',
            recur: false,
            daily: false,
            monthly: false,
            annually: false
        },
        {
            id: 201,
            title: 'Lunch',
            start: new Date(this.y, this.m, this.d + 7, 12, 0),
            end: new Date(this.y, this.m, this.d + 7, 14, 0),
            allDay: false,
            className: 'event-red',
            recur: false,
            daily: false,
            monthly: false,
            annually: false
        },
        {
            id: 501,
            title: 'Birthday Party',
            start: new Date(this.y, this.m, this.d + 1, 19, 0),
            end: new Date(this.y, this.m, this.d + 1, 22, 30),
            allDay: false,
            className: 'event-azure',
            recur: false,
            daily: false,
            monthly: false,
            annually: false
        }
    ];

    public JohnList =
    [{
        id: 601,
        title: 'Testing other user view',
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
        title: 'Testing other user view',
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
        title: 'Testing other user view',
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
        title: 'Testing other user view',
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
        title: 'Testing other user view',
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
        title: 'Testing other user view',
        start: new Date(this.y, this.m, this.d + 4, 19, 0),
        end: new Date(this.y, this.m, this.d + 4, 22, 30),
        allDay: false,
        className: 'event-orange',
        recur: true,
        daily: false,
        monthly: false,
        annually:false
    }];

    selectedUsers: string[];

    selectTheme = 'primary';
    users = [
        { value: 'Tania' },
        { value: 'John' },
        { value: 'Mary' }
    ];

    ngOnInit() {
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
            businessHours: [ // specify an array instead
                {
                    dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
                    start: '08:00', // 8am
                    end: '18:00' // 6pm
                }
            ],

            select: (start: any, end: any)=> {
                var self = this;
                // on select we show the Sweet Alert modal with an input
                swal({
                    title: 'Make an appointment',
                    html: '<div class="form-group">' +
                    '<div class="row" style="margin-bottom:10px">' +
                            '<input class="form-control" placeholder="Staff" id="staff" value="'+ adminName +'" readonly>' +
                            '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                            '<input class="form-control" placeholder="Event Title" id="input-field">' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">From</label>' +
                    '<input type="date" name="input" id="dateFrom" value="' + start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">at</label>' +
                    '<input type="time" name="input" id="timeFrom" value="' + start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">To</label>' +
                    '<input type="date" name="input" id="dateTo" value="' + end.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">at</label>' +
                    '<input type="time" name="input" id="timeTo" value="' + end.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<input class="form-control" placeholder="Note" id="note">' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="togglebutton">' +
                    '<label>' +
                    '<input type="checkbox" name="recur" required/>' +  'Recurring' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="annually">' + 'Annually(3 years)' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="monthly">' + 'Monthly(6 months)' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="daily">' + 'Daily(7 days)' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                        '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result: any) {
                    
                    let eventData;
                    const staff = $('#staff').val();
                    const event_title = $('#input-field').val();
                    const note = $('#note').val();
                    const dateFrom = $('#dateFrom').val();
                    const dateTo = $('#dateTo').val();
                    const timeFrom = $('#timeFrom').val();
                    const timeTo = $('#timeTo').val();
                    const recur = $('input[name = "recur"]:checked').val();
                    const freq = $('input[name = "optionsRadios"]:checked').val();
                    // console.log(result);    //DEBUG: boolean
                    console.log(staff);
                    console.log(event_title);
                    console.log(note);
                    console.log(dateFrom);
                    console.log(dateTo);
                    console.log(timeFrom);
                    console.log(timeTo);
                    console.log(recur);
                    console.log(freq);
                    console.log(start);
                    console.log(end);
                    
                    if (event_title) {
                       
                            var times = recur != 'on'? 1 : freq == 'annually'? 3: freq == 'monthly'? 6 : freq == 'daily' && 7;
                            var randomId = Math.floor(Math.random() * 1000);
                            for(var i = 0; i < times; i ++){
                                var customStart;
                                var customEnd;
                                var customClass;
                                var r= false;
                                var d= false;
                                var m= false;
                                var a= false;
                                if(times == 1){

                                    customStart = start;
                                    customEnd = end;
                                    customClass = 'event-green';

                                }else if(times == 3){

                                    customStart = new Date(parseInt(dateFrom.substring(0,4)) + i, dateFrom.substring(5, 7) - 1, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateTo.substring(5, 7) - 1, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-red';
                                    r=true;
                                    a=true;
                                    
                                }else if(times == 6){

                                    customStart = new Date(dateFrom.substring(0,4), dateFrom.substring(5, 7) - 1 + i, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0,4), dateTo.substring(5, 7) - 1 + i, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-orange';
                                    r=true;
                                    m=true;
                                   
                                }else if(times == 7){

                                    customStart = new Date(dateFrom.substring(0,4), dateFrom.substring(5, 7) - 1, parseInt(dateFrom.substring(8, 10)) + i, timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0,4), dateTo.substring(5, 7) - 1, parseInt(dateTo.substring(8, 10)) + i, timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-azure';
                                    r=true;
                                    d=true;
                                   
                                }

                                eventData = {
                                    id: randomId,        //same for recurring events
                                    title: event_title,
                                    start: customStart,
                                    end: customEnd,
                                    className: customClass,     //color of the event (azure for annually)
                                    // url:         //link can be added
                                    recur:r,
                                    daily:d,
                                    monthly:m,
                                    annually:a
                                };

                                console.log(eventData);
                                self.addEventList(eventData);

                                // console.log(eventData);     //DEBUG
                                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true

                                $calendar.fullCalendar('addEventSource', eventData);

                               
                            }
                            
                                         
                    }else{
                        swal(
                            "Failed to add event",
                            "You haven't fill in the event title yet. Please try again.",
                            'warning'
                        )
                    }
                    

                    $calendar.fullCalendar('unselect');

                });
                
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: this.eventList,
            eventClick: (event:any)=> {      //event on click swal edit or remove
                // console.log(event);     //DEBUG
                var self = this;
                var index = self.loadindex(event.id);
                var recur = self.loadRecur(event.id);
                var m = self.loadmonthly(event.id);
                var a = self.loadannually(event.id);
                var d = self.loaddaily(event.id);
                swal({
                    title: 'Make an appointment',
                    html: '<div class="form-group">' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<input class="form-control" placeholder="Staff" id="staff" value="' + adminName + '" readonly>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<input class="form-control" value="'+ event.title + '" id="input-field">' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">From</label>' +
                    '<input type="date" name="input" id="dateFrom" value="' + event.start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">at</label>' +
                    '<input type="time" name="input" id="timeFrom" value="' + event.start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">To</label>' +
                    '<input type="date" name="input" id="dateTo" value="' + event.end.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label style="margin-right:5px">at</label>' +
                    '<input type="time" name="input" id="timeTo" value="' + event.end.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<input class="form-control" placeholder="Note" id="note">' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="togglebutton">' +
                    '<label>' +
                    '<input type="checkbox" name="recur" checked=' + self.loadRecur(event.id) + ' required/>' + 'Recurring' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="annually" checked=' + a + '> Annually(3 years)' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="monthly" checked=' + m + '> Monthly(6 months)' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="daily" checked=' + d + '> Daily(7 days)' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    cancelButtonText: '<i class="material-icons">delete </i> Delete',
                    buttonsStyling: false
                }).then((result)=> {

                        let eventData;
                        const staff = $('#staff').val();
                        const event_title = $('#input-field').val();
                        const note = $('#note').val();
                        const dateFrom = $('#dateFrom').val();
                        const dateTo = $('#dateTo').val();
                        const timeFrom = $('#timeFrom').val();
                        const timeTo = $('#timeTo').val();
                        const recur = $('input[name = "recur"]:checked').val();
                        const freq = $('input[name = "optionsRadios"]:checked').val();
                        // console.log(result);    //DEBUG: boolean
                        console.log(staff);
                        console.log(event_title);
                        console.log(note);
                        console.log(dateFrom);
                        console.log(dateTo);
                        console.log(timeFrom);
                        console.log(timeTo);
                        console.log(recur);
                        console.log(freq);
                        if (event_title) {
                            var times = recur != 'on' ? 1 : freq == 'annually' ? 3 : freq == 'monthly' ? 6 : freq == 'daily' && 7;
                            self.deleteEventList(event.id);
                            for (var i = 0; i < times; i++) {
                                var customStart;
                                var customEnd;
                                var customClass;
                                var r = false;
                                var d = false;
                                var m = false;
                                var a = false;
                                if (times == 1) {

                                    customStart = event.start;
                                    customEnd = event.end;
                                    customClass = 'event-green';

                                } else if (times == 3) {

                                    customStart = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateFrom.substring(5, 7) - 1, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateTo.substring(5, 7) - 1, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-red';
                                    r=true;
                                    a=true;

                                } else if (times == 6) {

                                    customStart = new Date(dateFrom.substring(0, 4), dateFrom.substring(5, 7) - 1 + i, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0, 4), dateTo.substring(5, 7) - 1 + i, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-orange';
                                    r=true;
                                    m=true;

                                } else if (times == 7) {

                                    customStart = new Date(dateFrom.substring(0, 4), dateFrom.substring(5, 7) - 1, parseInt(dateFrom.substring(8, 10)) + i, timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0, 4), dateTo.substring(5, 7) - 1, parseInt(dateTo.substring(8, 10)) + i, timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-azure';
                                    r=true;
                                    d=true;
                                }

                                eventData = {
                                    id: event.id,        //same for recurring events
                                    title: event_title,
                                    start: customStart,
                                    end: customEnd,
                                    className: customClass,     //color of the event (azure for annually)
                                    // url:         //link can be added
                                    recur: r,
                                    daily: d,
                                    monthly: m,
                                    annually: a
                                };

                                self.addEventList(eventData);
                                

                                // console.log(eventData);     //DEBUG
                                $calendar.fullCalendar('removeEvents',event.id);
                                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true

                                $calendar.fullCalendar('updateEvent', event);    //do something before, 
                                // and this will update the event
                            }

                        } else {
                            swal(
                                "Failed to edit event",
                                "You can't leave event title empty. Please try again.",
                                'warning'
                            )
                        }

                    $calendar.fullCalendar('unselect');

                },function(dismiss){
                    
                    if (dismiss === 'cancel') {
                        // delete this event
                        console.log('should delete event');     //DEBUG
                        $calendar.fullCalendar('removeEvents', event.id);        //some idOrFilter to be removed
                        self.deleteEventList(event.id);
                    }
                });

                if (event.url) {
                    window.open(event.url);
                    return false;
                }
            },
            eventDrop: function (event, delta, revertFunc) {

                // this.customMessagePopUp(revertFunc, event.title + " was dropped on " + event.start.format());

                swal({
                    title: event.title + " was dropped on " + event.start.format(),
                    text: "Are you sure about this change?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.value) {
                        swal(
                            'Updated!',
                            'Event has been updated.',
                            'success'
                        )

                        //update event date
                    }
                },function(dismiss){
                    if(dismiss === 'cancel'){
                        revertFunc();
                    }
                })

            },
            eventResize: function (event, delta, revertFunc) {

                // this.customMessagePopUp(revertFunc, event.title + " end is now " + event.end.format());

                swal({
                    title: event.title + " end is now " + event.end.format(),
                    text: "Are you sure about this change?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.value) {
                        swal(
                            'Updated!',
                            'Event has been updated.',
                            'success'
                        )

                        //update event time
                    }
                }, function (dismiss) {
                    if (dismiss === 'cancel') {
                        revertFunc();
                    }
                })

            }

        });
    }

    ngAfterViewInit(){}

    changeView(event){
        // console.log(this.selectedUsers);     //DEBUG
        var list = [];
        var renderList = [];
        for(var i = 0; i < this.selectedUsers.length; i ++){
            list = this.selectedUsers[i] == 'Tania'? this.eventList: this.selectedUsers[i] == 'John'?this.JohnList: this.MaryList;

            for(var j = 0; j < list.length; j ++){
                renderList.push(list[j]);
            }

        }
        // console.log(renderList);         //DEBUG
        $('#fullCalendar').fullCalendar('removeEventSources');
        $('#fullCalendar').fullCalendar('renderEvents', renderList);
    }

    loadindex(id) {
        var index;
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                return i;
            }
            // index = this.eventList[i].id == id&& i;
        }
    }

    loadRecur(id){
        var index;
        for(var i = 0; i < this.eventList.length; i ++){
            if(this.eventList[i].id == id){
        //         console.log(this.eventList[i]['recur']);
                return this.eventList[i]['recur'];
            } 
            // index = this.eventList[i].id == id&& i;
        }
    }

    loaddaily(id) {
        var index;
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                return this.eventList[i]['daily'];
            }
            // index = this.eventList[i].id == id&& i;
        }
    }

    loadmonthly(id) {
        var index;
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                return this.eventList[i]['monthly'];
            }
            // index = this.eventList[i].id == id&& i;
        }
    }

    loadannually(id) {
        var index;
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                return this.eventList[i]['annually'];
            }
            // index = this.eventList[i].id == id&& i;
        }
    }

    addEventList(eventData){
        this.eventList.push(eventData);
    }

    deleteEventList(id){
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                this.eventList.splice(i, 1);
            }
        }
    }

    // doesn't work in another function
    customMessagePopUp(func, message){
        swal({
            title: message,
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                swal(
                    'Updated!',
                    'Event has been updated.',
                    'success'
                )

                //update event date
            }
        }, function (dismiss) {
            if (dismiss === 'cancel') {
                func();
            }
        })
    }
   
 }