import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as Ps from 'perfect-scrollbar';

import { appService } from '../app.service';

import { CalendarComponent } from '../calendar/calendar.component';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: 'customer.component.html',
    styleUrls: ['./css/customer.css'],
    providers: [
        appService, CalendarComponent
    ]
})

export class CustomerComponent implements OnInit,AfterViewInit{
    
    public customers: any[];        //customers info
    public displayCust:any;         //customer to be shown on right

    //all customers'appointments arrays
    public allApts: any[] = [{"id":"101","appointments":[

        {
            "id": 101,
            "staff": "Tania Andrew",
            "title": "some service1",
            "note": "test change note",
            "start": "2017-11-14T15:00:00",
            "end": "2017-11-14T15:30:00",
            "date": "Thu 14 Dec 2017",
            "time": "03:00pm - 03:30pm",
            "customer": "Customer A",

            "duration": "30min",
            "cost": "$150",
            "recur": false,
            "daily": false,
            "monthly": false,
            "annually": false,
            "order": 0
        },
        {
            "id": 102,
            "staff": "Tania Andrew",
            "title": "some service2",
            "note": "1",
            "start": "2017-11-14T17:00:00",
            "end": "2017-11-14T18:00:00",
            "date": "Thu 14 Dec 2017",
            "time": "05:00pm - 06:00pm",
            "customer": "Customer A",

            "duration": "60min",
            "cost": "$300",
            "recur": false,
            "daily": false,
            "monthly": false,
            "annually": false,
            "order": 0
        }
    ]},
        {
            "id": "102", "appointments":[

            {
                "id": 103,
                "staff": "other staff",
                "title": "some service1",
                "note": "2",
                "start": "2017-11-15T09:00:00",
                "end": "2017-11-15T10:30:00",
                "date": "Thu 15 Dec 2017",
                "time": "09:00am - 10:30am",
                "customer": "John",

                "duration": "30min",
                "cost": "$150",
                "recur": false,
                "daily": false,
                "monthly": false,
                "annually": false,
                "order": 0
            },
            {
                "id": 104,
                "staff": "other staff2",
                "title": "some service2",
                "note": "3",
                "start": "2017-11-17T17:00:00",
                "end": "2017-11-17T18:00:00",
                "date": "Thu 17 Dec 2017",
                "time": "05:00pm - 06:00pm",
                "customer": "John",

                "duration": "60min",
                "cost": "$300",
                "recur": false,
                "daily": false,
                "monthly": false,
                "annually": false,
                "order": 0
            }
            ]
        }, {
            "id": "103", "appointments":[

            {
                "id": 103,
                "staff": "other staff",
                "title": "some service1",
                "note": "4",
                "start": "2017-11-15T09:00:00",
                "end": "2017-11-15T10:30:00",
                "date": "Thu 15 Dec 2017",
                "time": "09:00am - 10:30am",
                "customer": "Bob",

                "duration": "30min",
                "cost": "$150",
                "recur": false,
                "daily": false,
                "monthly": false,
                "annually": false,
                "order": 0
            }
        ]}];

    public appointments:any;        //appointments to be shown on right
    weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    services = ['some service1', 'some service2'];
    public adminPic: string;
    private admininfoLink = 'http://testingtesttest.000webhostapp.com/adminInfo.php';
    private customersLink = 'http://testingtesttest.000webhostapp.com/customer.php';

    constructor(private appService: appService, private CalendarComponent: CalendarComponent) {

    }
    
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
        // set value of the input fields

        // this.appService.getJson(this.customersLink).then((data) => {
        //     console.log(data);
        //     this.customers = data;

        for(var i = 0; i < this.allApts.length; i ++){
            var temp = this.allApts[i].appointments;
            for(var j = 0; j < temp.length; j ++){
                var tempstart = new Date(parseInt(temp[j].start.substring(0, 4)), parseInt(temp[j].start.substring(5, 7)), parseInt(temp[j].start.substring(8, 10)), parseInt(temp[j].start.substring(11, 13)), parseInt(temp[j].start.substring(14, 16)));
                var tempend = new Date(parseInt(temp[j].end.substring(0, 4)), parseInt(temp[j].end.substring(5, 7)), parseInt(temp[j].end.substring(8, 10)), parseInt(temp[j].end.substring(11, 13)), parseInt(temp[j].end.substring(14, 16)));
                temp[j].start = tempstart;
                temp[j].end = tempend;
            }
        }
            this.customers = [
                {
                    "id": "101",
                    "img": "../assets/img/faces/avatar.jpg",
                    "name": "Customer A",
                    "phone": "bd546139",
                    "mobile": "66443347",
                    "email": "hayhay0730@gmail.com",
                    "address": "somewhere over the rainbow",
                    "city": "HK",
                    "country": "China"

                },
                {
                    "id": "102",
                    "img": "../assets/img/faces/card-profile1-square.jpg",
                    "name": "John",
                    "phone": "bd546139",
                    "mobile": "66443347",
                    "email": "hayhay0730@gmail.com",
                    "address": "somewhere over the rainbow",
                    "city": "HK",
                    "country": "China"

                },
                {
                    "id": "103",
                    "img": "../assets/img/faces/card-profile2-square.jpg",
                    "name": "Bob",
                    "phone": "bd546139",
                    "mobile": "66443347",
                    "email": "hayhay0730@gmail.com",
                    "address": "somewhere over the rainbow",
                    "city": "HK",
                    "country": "China"
                }
            ];
            
                    
            this.displayCust = this.customers[0];       //default show the first customer
            this.appointments =this.allApts[0].appointments;        //default show the first customer's appointments
            
            setTimeout(function () { $('#subsidebar-0').addClass('selected'); }, 1000);     //need to wait till customers are loaded on the subsidebar
           
            this.adminPic = this.displayCust.img == "" ? "../../assets/img/placeholder.jpg" : this.displayCust.img;

            this.displayCust.img != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');
        // });


        var today = new Date();
        //below might needed in calendar to convert immediate displayable date in event obj
        var aptdate = this.weekday[today.getDay()] + " " + today.getDate() + " " + this.month[today.getMonth()] + " " + today.getFullYear();

        // {
        //     "id": 101,
        //         "staff": "Tania Andrew",
        //             "title": "All Day Event",
        //                 "note": "",
        //                     "start": "2017-11-18T08:00:00",
        //                         "end": "2017-11-18T09:00:00",
        //                             "className": "event-default",
        //                                 "recur": false,
        //                                     "daily": false,
        //                                         "monthly": false,
        //                                             "annually": false,
        //                                                 "order": 0
        // },

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

            // update info to DB
            // var updateAdmin = { "Admin": this.admin };
            // this.appService.postJson(this.admininfoPostLink, updateAdmin);

        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        })
    }

    addApt(){
        this.CalendarComponent.testing();
    }

    viewApt(id){
        const fiveYearsBefore = 2017 - 5;
        const fiveYearsAfter = 2017 + 5;
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
            selecthtml += this.services[i];
            if (event.title == this.services[i]) {
                selecthtml += '" selected >';

            } else {
                selecthtml += '" >';

            }
            selecthtml += this.services[i];
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
            '<div class="row">' +
            '<label style="margin-right:5px">Start time</label>' +
            '<input type="date" name="input" id="dateFrom" value="' + event.start.toISOString().substring(0, 10) + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required />' +
            '<input type="time" name="input" id="timeFrom" value="' + event.start.toISOString().substring(11, 19) + '" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
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
           

            

        }, function (dismiss) {

            if (dismiss === 'cancel') {
                // delete this event
                
                // console.log(self.eventList);        //DEBUG
            }
        });
    }

    addCustomer(){
        var self = this;
        swal({
            title: 'Add New Customer',
            html: '<input class="form-control" placeholder="Name" id="newName" >' +
            '<input class="form-control" placeholder="E-mail" type="email" id="newEmail" >' + 
            '<input class="form-control" placeholder="Mobile" type="tel" id="newMobile" >',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (result: any) {

            var name = $('#newName').val();
            var email = $('#newEmail').val();
            var mobile = $('#newMobile').val();
            console.log(name);
            console.log(email);
           console.log(mobile);
           const randomID = "104";

           var newCustInfo = {
               "id": randomID,
               "img": "../../assets/img/placeholder.jpg",
               "name": name,
               "phone": "",
               "mobile": mobile,
               "email": email,
               "address": "",
               "city": "",
               "country": ""

           };

           self.customers.push(newCustInfo);

           var newCustApt = {
               "id": randomID, "appointments": []};

            self.allApts.push(newCustApt);

            // update DB

        });
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
        for(var i = 0; i < this.allApts.length; i ++){
            if(this.allApts[i].id == id){
                this.allApts.splice(i,1);
            }
        }
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
        for(var i = 0; i < this.customers.length; i ++){
            if(this.customers[i].id == id){
                this.displayCust = this.customers[i];
                break;
            }
        }

        for(var i = 0; i < this.allApts.length; i ++){
            if(this.allApts[i].id == id){
                this.appointments = this.allApts[i].appointments;
                break;
            }
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

    processEvent(){

    }
  
}