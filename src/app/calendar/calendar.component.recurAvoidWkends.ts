// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { NgModel } from '@angular/forms';

import { appService } from '../app.service';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-calendar-cmp',
    templateUrl: 'calendar.component.html',
    styleUrls: [],
    providers: [
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

    eventListlink = 'http://testingtesttest.000webhostapp.com/eventList.php';
    public eventList = [];
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
    // ============testing events====================
    // eventList = [

    //     {
    //         id: 101,
    //         staff: 'Tania Andrew',
    //         title: 'All Day Event',
    //         note: '',
    //         start: new Date(this.y, this.m, 1, 0, 0),
    //         end: new Date(this.y, this.m, 1, 23, 59),
    //         className: 'event-default',
    //         recur: false,
    //         daily: false,
    //         monthly: false,
    //         annually:false,
    //         order:0
    //     },
    //     {
    //         id: 999,
    //         staff: 'Tania Andrew',
    //         title: 'Repeating Event',
    //         note: '',
    //         start: new Date(this.y, this.m,this.d - 4, 6, 0),
    //         end: new Date(this.y, this.m, this.d - 4, 8, 0),
    //         allDay: false,
    //         className: 'event-rose',
    //         recur: true,
    //         daily: true,
    //         monthly: false,
    //         annually:false,
    //         order:0
    //     },
    //     {
    //         id: 999,
    //         staff: 'Tania Andrew',
    //         title: 'Repeating Event',
    //         note: '',
    //         start: new Date(this.y, this.m, this.d - 3, 6, 0),
    //         end: new Date(this.y, this.m, this.d - 3, 8, 0),
    //         allDay: false,
    //         className: 'event-rose',
    //         recur: true,
    //         daily: true,
    //         monthly: false,
    //         annually:false,
    //         order:1
    //     },
    //     {
    //         id: 999,
    //         staff: 'Tania Andrew',
    //         title: 'Repeating Event',
    //         note: '',
    //         start: new Date(this.y, this.m, this.d - 2, 6, 0),
    //         end: new Date(this.y, this.m, this.d - 2, 8, 0),
    //         allDay: false,
    //         className: 'event-rose',
    //         recur: true,
    //         daily: true,
    //         monthly: false,
    //         annually:false,
    //         order:2
    //     },
    //     {
    //         id: 999,
    //         staff: 'Tania Andrew',
    //         title: 'Repeating Event',
    //         note: '',
    //         start: new Date(this.y, this.m, this.d - 1, 6, 0),
    //         end: new Date(this.y, this.m, this.d - 1, 8, 0),
    //         allDay: false,
    //         className: 'event-rose',
    //         recur: true,
    //         daily: true,
    //         monthly: false,
    //         annually:false,
    //         order:3
    //     },
    //     {
    //         id: 201,
    //         staff: 'Tania Andrew',
    //         title: 'Lunch',
    //         note: '',
    //         start: new Date(this.y, this.m, this.d + 7, 12, 0),
    //         end: new Date(this.y, this.m, this.d + 7, 14, 0),
    //         allDay: false,
    //         className: 'event-red',
    //         recur: false,
    //         daily: false,
    //         monthly: false,
    //         annually: false,
    //         order:0
    //     },
    //     {
    //         id: 501,
    //         staff: 'Tania Andrew',
    //         title: 'Birthday Party',
    //         note: '',
    //         start: new Date(this.y, this.m, this.d + 1, 19, 0),
    //         end: new Date(this.y, this.m, this.d + 1, 22, 30),
    //         allDay: false,
    //         className: 'event-azure',
    //         recur: false,
    //         daily: false,
    //         monthly: false,
    //         annually: false,
    //         order:0
    //     }
    // ];

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
        annually: false
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
        annually: false
    }];

    // ==========end of testing events==================

    selectedUsers: string[];        //users'views

    selectTheme = 'primary';
    users = [
        { value: 'Tania' },
        { value: 'John' },
        { value: 'Mary' }
    ];

    ngOnInit() {

        for (var i = 0; i < this.businessHours.length; i++) {
            var bdow = this.businessHours[i].dow;
            var temp1 = { dow: [], start: '', end: '' };
            var temp2 = { dow: [], start: '', end: '' };
            for (var j = 0; j < bdow.length; j++) {
                // console.log(this.breakTime[i].dow.indexOf(bdow[j]));
                if (this.breakTime[i].dow.indexOf(bdow[j]) != -1) {
                    temp1.dow[j] = bdow[j];
                    this.workdays.push(bdow[j]);
                }
            }
            if (temp1.start == '') {
                temp1.start = this.businessHours[i].start;
                temp1.end = this.breakTime[i].start;
                temp2.dow = temp1.dow;
                temp2.start = this.breakTime[i].end;
                temp2.end = this.businessHours[i].end;
                this.workingHours.push(temp1);
                this.workingHours.push(temp2);
            }



        }
        // console.log(this.workingHours);

        const $calendar = $('#fullCalendar');
        const adminName = 'Tania Andrew';

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();      //need to add 1
        const d = today.getDate();

        const fiveYearsAfter = y + 5;
        const fiveYearsBefore = y - 5;


        $calendar.fullCalendar({
            viewRender: function (view: any, element: any) {
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
            defaultView: 'agendaWeek',
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
            businessHours: this.workingHours, //this.businessHours,
            eventConstraint: "businessHours",

            select: (start: any, end: any) => {
                var self = this;
                // on select we show the Sweet Alert modal with an input
                if (self.workdays.indexOf(start.day()) != -1) {



                    swal({
                        title: 'Make an appointment',
                        html: '<input class="form-control" placeholder="Staff" id="staff" value="' + adminName + '" readonly>' +
                        '<input class="form-control" placeholder="Event Title" id="input-field">' +
                        '<div class="row">' +
                        '<label style="margin-right:5px">From</label>' +
                        '<input type="date" name="input" id="dateFrom" value="' + start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                        '<input type="time" name="input" id="timeFrom" value="' + start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                        '</div>' +
                        '<div class="row">' +
                        '<label style="margin-right:5px">To</label>' +
                        '<input type="date" name="input" id="dateTo" value="' + end.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                        '<input type="time" name="input" id="timeTo" value="' + end.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                        '</div>' +
                        '<input class="form-control" placeholder="Note" id="note">' +
                        '<div class="row">' +
                        '<input type="checkbox" name="recur" required/>' + 'Recurring' +
                        '</div>' +
                        '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;">' + 'Annually(3 years)' +
                        '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;">' + 'Monthly(6 months)' +
                        '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;">' + 'Daily(7 days)',
                        showCancelButton: true,
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function (result: any) {

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
                        var timeFromHour = parseInt(timeFrom.substring(0, 2));
                        var timeFromMin = parseInt(timeFrom.substring(3, 5));
                        var timeToHour = parseInt(timeTo.substring(0, 2));
                        var timeToMin = parseInt(timeTo.substring(3, 5));

                        for (var i = 0; i < self.workingHours.length; i += 2) {
                            var morningFromHour = parseInt(self.workingHours[i].start.substring(0, 2));
                            var morningFromMin = parseInt(self.workingHours[i].start.substring(3, 5));
                            var morningToHour = parseInt(self.workingHours[i].end.substring(0, 2));
                            var morningToMin = parseInt(self.workingHours[i].end.substring(3, 5));

                            var afternoonFromHour = parseInt(self.workingHours[i + 1].start.substring(0, 2));
                            var afternoonFromMin = parseInt(self.workingHours[i + 1].start.substring(3, 5));
                            var afternoonToHour = parseInt(self.workingHours[i + 1].end.substring(0, 2));
                            var afternoonToMin = parseInt(self.workingHours[i + 1].end.substring(3, 5));

                            if (timeFromHour < morningFromHour || timeFromHour > afternoonToHour - 1) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeFromHour > timeToHour) {
                                swal(
                                    "Failed to add event",
                                    "Invalid time",
                                    'warning'
                                )
                            } else if (timeToHour > afternoonToHour) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeToHour == afternoonToHour && timeToMin > afternoonToMin) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeFromHour > morningToHour - 1 && timeFromHour < afternoonFromHour) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeFromHour == morningToHour && timeFromMin > morningToMin) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeFromHour == afternoonFromHour && timeFromMin < afternoonFromMin) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeToHour > morningToHour && timeToHour < afternoonFromHour + 1) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeToHour == afternoonFromHour && timeToMin < afternoonFromMin) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (timeToHour == morningToHour && timeToMin > morningToMin) {
                                swal(
                                    "Failed to add event",
                                    "We are closed at that time",
                                    'warning'
                                );
                            } else if (event_title) {

                                var times = recur != 'on' ? 1 : freq == 'annually' ? 3 : freq == 'monthly' ? 6 : freq == 'daily' && 7;
                                var randomId = Math.floor(Math.random() * 1000);
                                var k = 0;
                                for (var i = 0; i < times; i++) {

                                    var temp = self.custStartCustEnd(parseInt(dateFrom.substring(0, 4)), parseInt(dateFrom.substring(5, 7)) - 1, parseInt(dateFrom.substring(8, 10)), timeFromHour, timeFromMin, parseInt(dateTo.substring(0, 4)), parseInt(dateTo.substring(5, 7)) - 1, parseInt(dateTo.substring(8, 10)), parseInt(timeTo.substring(0, 2)), parseInt(timeTo.substring(3, 5)), times, i, k);

                                    var customStart = temp.start;
                                    var customEnd = temp.end;
                                    var customClass = temp.class;
                                    var r = temp.recur;
                                    var d = temp.daily;
                                    var m = temp.monthly;
                                    var a = temp.annually;
                                    k = temp.K;
                                    console.log(k);

                                    eventData = {
                                        id: randomId,        //same for recurring events
                                        staff: adminName,
                                        title: event_title,
                                        note: note,
                                        start: customStart,
                                        end: customEnd,
                                        className: customClass,     //color of the event (once:green, daily:azure,monthly:orange,annually:red)
                                        recur: r,
                                        daily: d,
                                        monthly: m,
                                        annually: a,
                                        order: i
                                    };

                                    self.eventList.push(eventData);

                                    // console.log(eventData);     //DEBUG
                                    $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true

                                    $calendar.fullCalendar('addEventSource', eventData);


                                }


                            } else {
                                swal(
                                    "Failed to add event",
                                    "You haven't fill in the event title yet. Please try again.",
                                    'warning'
                                )
                            }

                        }           //end of for workingHours



                        $calendar.fullCalendar('unselect');

                    });


                } else {               //end of check on weekdays
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
            eventClick: (event: any) => {      //event on click swal edit or remove
                var self = this;
                var temp = self.loadRecur(event.id);

                swal({
                    title: 'Make an appointment',
                    html: '<input class="form-control" placeholder="Staff" id="staff" value="' + event.staff + '" readonly>' +
                    '<input class="form-control" value="' + event.title + '" id="input-field">' +
                    '<label style="margin-right:5px;color:black;">Drag to modify date</label>' +
                    '<div class="row">' +
                    '<label style="margin-right:5px">From</label>' +
                    // '<input type="date" name="input" id="dateFrom" value="' + event.start.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '<input type="time" name="input" id="timeFrom" value="' + event.start.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '<div class="row">' +
                    '<label style="margin-right:5px">To</label>' +
                    // '<input type="date" name="input" id="dateTo" value="' + event.end.format("YYYY-MM-DD") + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
                    '<input type="time" name="input" id="timeTo" value="' + event.end.format("HH:mm:ss") + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                    '</div>' +
                    '<input class="form-control" placeholder="Note" id="note" value="' + event.note + '">' +
                    '<div class="row">' +
                    '<input type="checkbox" name="recur" ' + temp.recur + ' required/>' + 'Recurring' +
                    '</div>' +
                    '<input type="radio" name= "optionsRadios" value="annually" style="margin-left:8px;" ' + temp.annually + '> Annually(3 years)' +
                    '<input type="radio" name= "optionsRadios" value="monthly" style="margin-left:8px;" ' + temp.monthly + '> Monthly(6 months)' +
                    '<input type="radio" name= "optionsRadios" value="daily" style="margin-left:8px;" ' + temp.daily + '> Daily(7 days)',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    cancelButtonText: '<i class="material-icons">delete </i> Delete',
                    buttonsStyling: false
                }).then((result) => {

                    let eventData;
                    const staff = $('#staff').val();
                    const event_title = $('#input-field').val();
                    const note = $('#note').val();
                    const timeFrom = $('#timeFrom').val();
                    const timeTo = $('#timeTo').val();
                    const recur = $('input[name = "recur"]:checked').val();
                    const freq = $('input[name = "optionsRadios"]:checked').val();
                    // console.log(result);    //DEBUG: boolean
                    // DEBUG:===============
                    // console.log(staff);
                    // console.log(event_title);
                    // console.log(note);
                    // console.log(timeFrom);
                    // console.log(timeTo);
                    // console.log(recur);
                    // console.log(freq);
                    // ====================
                    var timeFromHour = parseInt(timeFrom.substring(0, 2));
                    var timeFromMin = parseInt(timeFrom.substring(3, 5));
                    var timeToHour = parseInt(timeTo.substring(0, 2));
                    var timeToMin = parseInt(timeTo.substring(3, 5));

                    for (var i = 0; i < self.workingHours.length; i += 2) {
                        var morningFromHour = parseInt(self.workingHours[i].start.substring(0, 2));
                        var morningFromMin = parseInt(self.workingHours[i].start.substring(3, 5));
                        var morningToHour = parseInt(self.workingHours[i].end.substring(0, 2));
                        var morningToMin = parseInt(self.workingHours[i].end.substring(3, 5));

                        var afternoonFromHour = parseInt(self.workingHours[i + 1].start.substring(0, 2));
                        var afternoonFromMin = parseInt(self.workingHours[i + 1].start.substring(3, 5));
                        var afternoonToHour = parseInt(self.workingHours[i + 1].end.substring(0, 2));
                        var afternoonToMin = parseInt(self.workingHours[i + 1].end.substring(3, 5));

                        if (timeFromHour < morningFromHour || timeFromHour > afternoonToHour - 1) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeFromHour > timeToHour) {
                            swal(
                                "Failed to add event",
                                "Invalid time",
                                'warning'
                            )
                        } else if (timeToHour > afternoonToHour) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeToHour == afternoonToHour && timeToMin > afternoonToMin) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeFromHour > morningToHour - 1 && timeFromHour < afternoonFromHour) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeFromHour == morningToHour && timeFromMin > morningToMin) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeFromHour == afternoonFromHour && timeFromMin < afternoonFromMin) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeToHour > morningToHour && timeToHour < afternoonFromHour + 1) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeToHour == afternoonFromHour && timeToMin < afternoonFromMin) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (timeToHour == morningToHour && timeToMin > morningToMin) {
                            swal(
                                "Failed to add event",
                                "We are closed at that time",
                                'warning'
                            );;
                        } else if (event_title) {
                            var times = recur != 'on' ? 1 : freq == 'annually' ? 3 : freq == 'monthly' ? 6 : freq == 'daily' && 7;
                            var start: any;
                            var end: any;
                            for (var i = 0; i < self.eventList.length; i++) {
                                if (self.eventList[i].id == event.id && start == null) {
                                    start = self.eventList[i].start;
                                    end = self.eventList[i].end;
                                    break;
                                }
                            }
                            self.deleteEventList(event.id);

                            $calendar.fullCalendar('removeEvents', event.id);
                            var k = 0;
                            for (var i = 0; i < times; i++) {
                                var temp = self.custStartCustEnd(start.getFullYear(), start.getMonth(), start.getDate(), timeFrom.substring(0, 2), timeFrom.substring(3, 5), end.getFullYear(), end.getMonth(), end.getDate(), timeTo.substring(0, 2), timeTo.substring(3, 5), times, i, k);
                                var customStart = temp.start;
                                var customEnd = temp.end;
                                var customClass = temp.class;
                                var r = temp.recur;
                                var d = temp.daily;
                                var m = temp.monthly;
                                var a = temp.annually;
                                k = temp.K;

                                eventData = {
                                    id: event.id,        //same for recurring events
                                    staff: event.staff,
                                    title: event_title,
                                    note: note,
                                    start: customStart,
                                    end: customEnd,
                                    className: customClass,     //color of the event (once:green, daily:azure,monthly:orange,annually:red)
                                    recur: r,
                                    daily: d,
                                    monthly: m,
                                    annually: a,
                                    order: i
                                };

                                self.eventList.push(eventData);
                                // console.log(eventData);     //DEBUG

                                $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                                $calendar.fullCalendar('addEventSource', eventData);
                            }
                            // console.log(self.eventList);        //DEBUG
                        } else {
                            swal(
                                "Failed to edit event",
                                "You can't leave event title empty. Please try again.",
                                'warning'
                            )
                        }
                    }

                    $calendar.fullCalendar('unselect');

                }, function (dismiss) {

                    if (dismiss === 'cancel') {
                        // delete this event
                        $calendar.fullCalendar('removeEvents', event.id);        //some idOrFilter to be removed
                        self.deleteEventList(event.id);
                        // console.log(self.eventList);        //DEBUG
                    }
                });



            },
            eventDrop: (event, delta, revertFunc) => {
                var self = this;
                self.customMessagePopUp(revertFunc, event.title + " was dropped on " + event.start.format("YYYY-MM-DD"), event);

            },
            eventResize: (event, delta, revertFunc) => {
                var self = this;
                self.customMessagePopUp(revertFunc, event.title + " end is now " + event.end.format("HH:mm"), event);

            }

        });
    }

    ngAfterViewInit() { }

    changeView(event) {
        // console.log(this.selectedUsers);     //DEBUG
        var list = [];
        var renderList = [];

        for (var i = 0; i < this.selectedUsers.length; i++) {
            list = this.selectedUsers[i] == 'Tania' ? this.eventList : this.selectedUsers[i] == 'John' ? this.JohnList : this.MaryList;

            for (var j = 0; j < list.length; j++) {
                renderList.push(list[j]);
            }

        }
        // console.log(renderList);         //DEBUG
        $('#fullCalendar').fullCalendar('removeEvents');
        // $('#fullCalendar').fullCalendar('renderEvent', renderList,true);         //doesn't work
        $('#fullCalendar').fullCalendar('addEventSource', renderList);
    }

    loadRecur(id) {
        var obj: any;
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id == id) {
                if (this.eventList[i]['recur']) {
                    obj = this.eventList[i]['daily'] ? { recur: 'checked', annually: '', monthly: '', daily: 'checked' } : this.eventList[i]['monthly'] ? { recur: 'checked', annually: '', monthly: 'checked', daily: '' } : { recur: 'checked', annually: 'checked', monthly: '', daily: '' }

                } else {
                    obj = { recur: '', annually: '', monthly: '', daily: '' };
                }
                return obj;
            }
        }
    }

    deleteEventList(id) {
        for (var i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].id === id) {
                this.eventList.splice(i, 1);
                i--;
            }
        }
    }

    custStartCustEnd(sy, sm, sd, sh, smin, ey, em, ed, eh, emin, times, i, k) {
        var customStart;
        var customEnd;
        var customClass;
        var r = false;
        var d = false;
        var m = false;
        var a = false;

        if (times == 1) {
            customStart = new Date(sy, sm, sd, sh, smin);
            customEnd = new Date(ey, em, ed, eh, emin);
            customClass = 'event-green';
        } else if (times == 3) {
            customStart = new Date(sy + i, sm, sd, sh, smin);
            customEnd = new Date(ey + i, em, ed, eh, emin);
            customClass = 'event-red';
            r = true;
            a = true;

            while (this.workdays.indexOf(customStart.getDay()) == -1) {
                customStart = new Date(sy + i, sm, sd + k, sh, smin);
                customEnd = new Date(ey + i, em, ed + k, eh, emin);
                k++;
            }
            k = 0;
        } else if (times == 6) {
            customStart = new Date(sy, sm + i, sd, sh, smin);
            customEnd = new Date(ey, em + i, ed, eh, emin);
            customClass = 'event-orange';
            r = true;
            m = true;

            while (this.workdays.indexOf(customStart.getDay()) == -1) {
                customStart = new Date(sy, sm + i, sd + k, sh, smin);
                customEnd = new Date(ey, em + i, ed + k, eh, emin);
                k++;
            }
            k = 0;
        } else if (times == 7) {
            customStart = new Date(sy, sm, sd + i + k, sh, smin);
            customEnd = new Date(ey, em, ed + i + k, eh, emin);
            customClass = 'event-azure';
            r = true;
            d = true;
            console.log('day' + customStart.getDay());
            while (this.workdays.indexOf(customStart.getDay()) == -1) {
                k++;
                customStart = new Date(sy, sm, sd + i + k, sh, smin);
                customEnd = new Date(ey, em, ed + i + k, eh, emin);

                console.log(customStart);
                console.log('loop' + k);
            }
        }

        // console.log({ start: customStart, end: customEnd });        //DEBUG
        return { start: customStart, end: customEnd, class: customClass, recur: r, daily: d, monthly: m, annually: a, K: k };

    }


    customMessagePopUp(func, message, event) {
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

            var times = event.recur == false ? 1 : event.annually == true ? 3 : event.monthly == true ? 6 : event.daily == true && 7;

            self.deleteEventList(event.id);

            var temp;
            var k = 0;
            for (var i = 0; i < times; i++) {
                if (event.daily) {
                    temp = self.custStartCustEnd(parseInt(event.start.format().substring(0, 4)), parseInt(event.start.format().substring(5, 7)) - 1, parseInt(event.start.format().substring(8, 10)) - event.order, parseInt(event.start.format().substring(11, 13)), parseInt(event.start.format().substring(14, 16)), parseInt(event.end.format().substring(0, 4)), parseInt(event.end.format().substring(5, 7)) - 1, parseInt(event.end.format().substring(8, 10)) - event.order, parseInt(event.end.format().substring(11, 13)), parseInt(event.end.format().substring(14, 16)), times, i, k);
                } else if (event.monthly) {
                    temp = self.custStartCustEnd(parseInt(event.start.format().substring(0, 4)), parseInt(event.start.format().substring(5, 7)) - 1 - event.order, parseInt(event.start.format().substring(8, 10)), parseInt(event.start.format().substring(11, 13)), parseInt(event.start.format().substring(14, 16)), parseInt(event.end.format().substring(0, 4)), parseInt(event.end.format().substring(5, 7)) - 1 - event.order, parseInt(event.end.format().substring(8, 10)), parseInt(event.end.format().substring(11, 13)), parseInt(event.end.format().substring(14, 16)), times, i, k);
                } else if (event.annually) {
                    temp = self.custStartCustEnd(parseInt(event.start.format().substring(0, 4)) - event.order, parseInt(event.start.format().substring(5, 7)) - 1, parseInt(event.start.format().substring(8, 10)), parseInt(event.start.format().substring(11, 13)), parseInt(event.start.format().substring(14, 16)), parseInt(event.end.format().substring(0, 4)) - event.order, parseInt(event.end.format().substring(5, 7)) - 1, parseInt(event.end.format().substring(8, 10)), parseInt(event.end.format().substring(11, 13)), parseInt(event.end.format().substring(14, 16)), times, i, k);
                } else {
                    temp = self.custStartCustEnd(parseInt(event.start.format().substring(0, 4)), parseInt(event.start.format().substring(5, 7)) - 1, parseInt(event.start.format().substring(8, 10)), parseInt(event.start.format().substring(11, 13)), parseInt(event.start.format().substring(14, 16)), parseInt(event.end.format().substring(0, 4)), parseInt(event.end.format().substring(5, 7)) - 1, parseInt(event.end.format().substring(8, 10)), parseInt(event.end.format().substring(11, 13)), parseInt(event.end.format().substring(14, 16)), times, i, k);
                }

                var customStart = temp.start;
                var customEnd = temp.end;
                k = temp.K;


                var eventData = {
                    id: event.id,        //same for recurring events
                    staff: event.staff,
                    title: event.title,
                    note: event.note,
                    start: customStart,
                    end: customEnd,
                    className: event.className,     //color of the event (once:green, daily:azure,monthly:orange,annually:red)
                    recur: event.recur,
                    daily: event.daily,
                    monthly: event.monthly,
                    annually: event.annually,
                    order: i
                };

                self.eventList.push(eventData);

                // console.log(eventData);     //DEBUG
            }
            // console.log(this.eventList);        //DEBUG

        }, function (dismiss) {
            if (dismiss === 'cancel') {
                func();
            }
        })
    }

    loadEventList() {
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

            }

            return this.eventList;
        });

    }

}