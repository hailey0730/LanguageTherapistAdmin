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
                left: 'title, prevYear, nextYear',
                center: 'month, agendaWeek, agendaDay',
                right: 'prev, next, today'
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
                            '<input class="form-control" placeholder="Staff" id="staff">' +
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
                    '<input type="checkbox" id="recur" required/>' +  'Recurring' +
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
                    const recur = $('#recur').val();
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


                        eventData = {
                            // id: ,        //same for recurring events
                            title: event_title,
                            start: start,
                            end: end
                            // className:       //color of the event (now all green)
                            // url:         //link can be added
                        };
                        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true

                        $calendar.fullCalendar('addEventSource', eventData);
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
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
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
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green'
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red'
                },
                {
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'event-azure'
                },
                {
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'https://www.creative-tim.com/',
                    className: 'event-orange'
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'https://www.creative-tim.com/',
                    className: 'event-orange'
                }
            ],
            eventClick: function (event) {      //event on click swal edit or remove
                console.log(event);
                // event.title = "CLICKED!";
                // $calendar.fullCalendar('updateEvent', event);    //do something before, 
                // and this will update the event

                // or remove the event
                // $calendar.fullCalendar('removeEvents', );        //some idOrFilter to be removed

                if (event.url) {
                    window.open(event.url);
                    return false;
                }
            }
        });
    }

    public ngAfterViewInit(){}

    

}
