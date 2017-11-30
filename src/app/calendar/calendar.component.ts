// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';

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

    ngOnInit() {
        const $calendar = $('#fullCalendar');
        const adminName = 'Tania Andrew';

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        const fiveYearsAfter = y + 5;
        const fiveYearsBefore = y - 5;

        console.log(today);
        console.log(y);
        console.log(m);     //need to add 1
        console.log(d);

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
                    dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday
                    start: '08:00', // 8am
                    end: '18:00' // 6pm
                }
                // ,
                // {
                //     dow: [4, 5], // Thursday, Friday
                //     start: '10:00', // 10am
                //     end: '16:00' // 4pm
                // }
            ],

            select: function(start: any, end: any) {

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
                    '<input type="radio" name= "optionsRadios" value="annually">' + 'Annually' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="monthly">' + 'Monthly' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="daily">' + 'Daily' +
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
                            
                            for(var i = 0; i < times; i ++){
                                var customStart;
                                var customEnd;
                                var customClass;
                                if(times == 1){

                                    customStart = start;
                                    customEnd = end;
                                    customClass = 'event-green';

                                }else if(times == 3){

                                    customStart = new Date(parseInt(dateFrom.substring(0,4)) + i, dateFrom.substring(5, 7) - 1, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateTo.substring(5, 7) - 1, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-red';
                                    
                                }else if(times == 6){

                                    customStart = new Date(dateFrom.substring(0,4), dateFrom.substring(5, 7) - 1 + i, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0,4), dateTo.substring(5, 7) - 1 + i, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-orange';
                                   
                                }else if(times == 7){

                                    customStart = new Date(dateFrom.substring(0,4), dateFrom.substring(5, 7) - 1, parseInt(dateFrom.substring(8, 10)) + i, timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0,4), dateTo.substring(5, 7) - 1, parseInt(dateTo.substring(8, 10)) + i, timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-azure';
                                   
                                }

                                eventData = {
                                    // id: ,        //same for recurring events
                                    title: event_title,
                                    start: customStart,
                                    end: customEnd,
                                    className: customClass     //color of the event (azure for annually)
                                    // url:         //link can be added
                                };

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
            events: [
                {
                    id: 101,
                    title: 'All Day Event',
                    start: new Date(y, m, 1, 0, 0),
                    end: new Date(y, m, 1, 23, 59),
                    className: 'event-default'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-rose'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-rose'
                },
                {
                    id:301,
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green'
                },
                {
                    id: 201,
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red'
                },
                {
                    id:401,
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    id:501,
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'event-azure'
                }
            ],
            eventClick: function (event:any) {      //event on click swal edit or remove
                console.log(event);     //DEBUG

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
                    '<input type="checkbox" name="recur" required/>' + 'Recurring' +
                    '</label>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-bottom:10px">' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="annually">' + 'Annually' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="monthly">' + 'Monthly' +
                    '</label>' +
                    '</div>' +
                    '<div class="radio col-md-4">' +
                    '<label>' +
                    '<input type="radio" name= "optionsRadios" value="daily">' + 'Daily' +
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

                            for (var i = 0; i < times; i++) {
                                var customStart;
                                var customEnd;
                                var customClass;
                                if (times == 1) {

                                    customStart = event.start;
                                    customEnd = event.end;
                                    customClass = 'event-green';

                                } else if (times == 3) {

                                    customStart = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateFrom.substring(5, 7) - 1, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(parseInt(dateFrom.substring(0, 4)) + i, dateTo.substring(5, 7) - 1, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-red';

                                } else if (times == 6) {

                                    customStart = new Date(dateFrom.substring(0, 4), dateFrom.substring(5, 7) - 1 + i, dateFrom.substring(8, 10), timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0, 4), dateTo.substring(5, 7) - 1 + i, dateTo.substring(8, 10), timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-orange';

                                } else if (times == 7) {

                                    customStart = new Date(dateFrom.substring(0, 4), dateFrom.substring(5, 7) - 1, parseInt(dateFrom.substring(8, 10)) + i, timeFrom.substring(0, 2), timeFrom.substring(3, 5));
                                    customEnd = new Date(dateFrom.substring(0, 4), dateTo.substring(5, 7) - 1, parseInt(dateTo.substring(8, 10)) + i, timeTo.substring(0, 2), timeTo.substring(3, 5));
                                    customClass = 'event-azure';

                                }

                                eventData = {
                                    // id: ,        //same for recurring events
                                    title: event_title,
                                    start: customStart,
                                    end: customEnd,
                                    className: customClass     //color of the event (azure for annually)
                                    // url:         //link can be added
                                };

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

    public ngAfterViewInit(){}

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