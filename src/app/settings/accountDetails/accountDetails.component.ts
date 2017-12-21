import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
import { Booking } from '../../bookingSystem/booking';
import * as moment from 'moment';
import 'moment/locale/pt-br';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './accountDetails.component.html',
    styleUrls: ['../css/subsidebar.css'],
    providers: [appService, Booking]
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
    weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public admin: any;
    public adminPic: string;
    staffList = [];
    services:any[] = [
        {"id":401, "categories":["cat 1"],"name":"service A","duration":30,"cost":150, "description":"","staff":["Tania Andrew"]}, 
        {"id":402,"categories":[],"name":"service B","duration":60,"cost":300,"description":"","staff":["John Chan","Tania Andrew"]}];
    public workingHr: any[] = [moment(new Date(0, 0, 0, 9, 30)).format("HH:mm"), moment(new Date(0, 0, 0, 18, 0)).format("HH:mm")];
    public weeks: any[] = [{ day: 'Monday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Tuesday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Wednesday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Thursday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Friday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Saturday', switch: false, from: this.workingHr[0], to: this.workingHr[1] },
    { day: 'Sunday', switch: false, from: this.workingHr[0], to: this.workingHr[1] }];
    public weeksBreak: any[] = [{ day: 'Monday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Tuesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Wednesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Thursday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Friday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Saturday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
    { day: 'Sunday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] }];
    timeOffList: any[] = [{"id":501, "displayFrom": "26 Dec 2017, 8:00 am", "displayTo":"26 Dec 2017, 1:30 pm"}];
    private admininfoLink = 'http://testingtesttest.000webhostapp.com/adminInfo.php';
    private admininfoPostLink = 'http://testingtesttest.000webhostapp.com/adminInfo.json';

    constructor(private appService: appService, private Booking: Booking) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {

       // set value of the input fields
        this.admin = {
            "id": 301,
            "img": "../assets/img/faces/avatar.jpg",
            "name": "Tania Andrew",
            "phone": "bd546139",
            "mobile": "66443347",
            "email": "hayhay0730@gmail.com",
            "address": "somewhere over the rainbow",
            "city": "HK",
            "country": "China",
            "description": "some description"
        };

        

        var self = this;
        // set side bar selected
        setTimeout(function () {
            
            $('.staffName').each(function (i, obj) {
                if ($(this).text() == self.admin.name) {
                    var li = $(this).parent().parent().parent();
                    $(li).addClass('selected'); 
                }
            });
            // console.log(self.admin);        //DEBUG
            self.admin.img != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');            
        }, 1000);     //need to wait till customers are loaded on the subsidebar

        // account Details tab 
        

        var staff2 = {
            "id": 302,
            "img": "../assets/img/faces/avatar.jpg",
            "name": "John Chan",
            "phone": "bd546139",
            "mobile": "66443347",
            "email": "hayhay0730@gmail.com",
            "address": "somewhere over the rainbow",
            "city": "HK",
            "country": "China",
            "description": "some description"
        };

        this.staffList.push(this.admin);
        this.staffList.push(staff2);

        // this.appService.getJson(this.admininfoLink).then((data)=>{
        //     console.log(data);
        //     this.admin = data['Admin'];
        //     this.adminPic = this.admin[0] == ""?"../../assets/img/placeholder.jpg":this.admin[0];

        //     this.admin[0] != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');
        // })


        // working hours tab
        $("form").on('mouseover', '.row', function (event) {
            var weekday = $(event.target).children()[0];
            var i = weekday == 'Monday' ? 0 : weekday == 'Tuesday' ? 1 : weekday == 'Wednesday' ? 2 : weekday == 'Thursday' ? 3 : weekday == 'Friday' ? 4 : weekday == 'Saturday' ? 5 : 6;
            var row = event.target.closest('.row');
            $(row).css('background-color', '#fdeeff');

        });

        $("form").on('mouseout', '.row', function (event) {
            var weekday = $(event.target).children()[0];
            var i = weekday == 'Monday' ? 0 : weekday == 'Tuesday' ? 1 : weekday == 'Wednesday' ? 2 : weekday == 'Thursday' ? 3 : weekday == 'Friday' ? 4 : weekday == 'Saturday' ? 5 : 6;
            var row = event.target.closest('.row');
            $(row).css('background-color', 'white');

        });



        // breaks tab
        $("#breakTable").on('click', '#delete', function (event) {
            var row = event.target.closest('tr');
            $(row).remove();

        });

        $("#breakTable").on('click', '#add', function (event) {
            var addBreak = '<tr>' +
                '<ng-container *ngIf="duration != null;">' +
                '<td>' +
                '<label style="margin-right:5px"> From </label>' +
                '<input type="time" name="input" class="timeFrom" style="margin: 10px 0 10px 0;" value="{{duration.from}}" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                '<label style="margin-right:5px" > To </label>' +
                '<input type="time" name="input" class="timeTo" style="margin: 10px 0 10px 0;" value="{{duration.to}}" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
                '</td>' +
                '<td class="td-actions text-right" >' +
                '<button id="delete" type="button" rel="tooltip" class="btn btn-danger btn-round simple" >' +
                '<i class="material-icons" > close </i>' +
                '</button>' +
                '</td>' +
                '</ng-container>' +
                '</tr>';

            var row = event.target.closest('tr');
            var subrow = $(row).children()[2];      //breakTime id
            var tbody = $(subrow).children()[0];
            $(tbody).append(addBreak);

        }); 
            
    }
    
    ngAfterViewInit() {
       
    }

    // account details tab
    update(){
        swal({
            title: "Profile changed",
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            this.admin.img = $('#pic').val()==""?this.admin.img:$('#pic').val();
            this.admin.name = $('#name').val();
            this.admin.phone = $('#phone').val();
            this.admin.mobile = $('#mobile').val();
            this.admin.email = $('#email').val();
            this.admin.address = $('#addr').val();
            this.admin.city = $('#city').val();
            this.admin.country = $('#country').val();
            this.admin.description = $('textarea').val();
           
            console.log(this.admin);        //DEBUG

            // update info to DB
            var updateAdmin = {"Admin":this.admin};
            this.appService.postJson(this.admininfoPostLink, updateAdmin);
              
        }, function (dismiss) {
            if (dismiss === 'cancel') {
               
            }
        })
    }

    addStaff(){

        var newStaffInfo = {
            "id": 0,
            "img": "../../assets/img/placeholder.jpg",
            "name": "",
            "phone": "",
            "mobile": "",
            "email": "",
            "address": "",
            "city": "",
            "country": "",
            "description": ""

        };

        this.Booking.addNew("Staff", this.Booking.custStaffHtmlTemp, newStaffInfo, this.staffList);

        // var self = this;
        // swal({
        //     title: 'Add New Staff',
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
        //     console.log(mobile);
        //     const randomID = "104";

        //     var newStaffInfo = {
        //         "id": randomID,
        //         "img": "../../assets/img/placeholder.jpg",
        //         "name": name,
        //         "phone": "",
        //         "mobile": mobile,
        //         "email": email,
        //         "address": "",
        //         "city": "",
        //         "country": "",
        //         "description": ""

        //     }; 

        //     self.staffList.push(newStaffInfo);

        //     // update DB

        // });
    }

    displayStaff(event, id){
        // unhighlight all
        $('li').removeClass('selected');

        // highlight selected
        var li = event.target.closest('li');
        $(li).addClass('selected');

        // go back to account detail tab
        $('li').removeClass('active');
        $('#default-tab').addClass('active');
        $('.tab-pane').removeClass('active');
        $('#acDetail').addClass('active');
        

        // change view
        for (var i = 0; i < this.staffList.length; i++) {
            if (this.staffList[i].id == id) {
                this.admin = this.staffList[i];
                break;
            }
        }

        // need to update list of services, working hours, breaks and time off too

    }

    removeStaff(event, id) {
        $('.tab-pane').removeClass('active');
        $('#acDetail').addClass('active');

        swal({
            title: "Delete staff",
            text: "Are you sure you want to delete this staff?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
        
            for (var i = 0; i < this.staffList.length; i++) {
                if (this.staffList[i].id == id) {
                    this.staffList.splice(i, 1);
                    if (this.admin.id == id) {
                        this.admin = this.staffList[0];
                        $('li').removeClass('selected');
                        $('#subsidebar-0').addClass('selected');
                    }
                }
            }
        });
    }


    // services tab
    initService(admin){
        
        $('input[name = "servicesCheckbox"]').prop("checked", false);
        
        for (var i = 0; i < this.services.length; i++) {
            var staff = this.services[i].staff;
            for (var j = 0; j < staff.length; j++) {
                var id = '#checkbox-' + this.services[i].id;
                if (staff[j] == admin) {
                    $(id).prop("checked", true);
                }
            }
        }
    }

    checkAll(event){
        const all = $('input[name = "all"]:checked').val();
        
        if(all){
            // check all boxes
            $('input[name = "servicesCheckbox"]').prop("checked",true);
        }else{
            // uncheck all boxes
            $('input[name = "servicesCheckbox"]').prop("checked", false);
        }
    }


    // working hour tab
    updatewkhr() {
        swal({
            title: "Working hours changed",
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            var timefrom = [];
            var timeto = [];
            // update weeks to DB
            $('.timeFrom').each(function (i, obj) {
                timefrom[i] = $(this).val();
            });
            // console.log(timefrom);      //DEBUG

            $('.timeTo').each(function (i, obj) {
                timeto[i] = $(this).val();
            });
            // console.log(timeto);        //DEBUG

            for (var i = 0; i < this.weeks.length; i++) {
                this.weeks[i].from = timefrom[i];
                this.weeks[i].to = timeto[i];
            }

            console.log(this.weeks);        //DEBUG
        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        })
    }


    // break tab
    updateBreak() {
        swal({
            title: "Working hours changed",
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            // console.log(this.weeksBreak);        //DEBUG
            var timefrom = [];
            var timeto = [];
            var error = false;

            // update weeksBreak to DB
            $('.timeFrom').each(function (i, obj) {
                if ($(this).val() == "" || $(this).val() == null) {
                    swal(
                        "Failed to update",
                        "You can't leave break time empty. Please try again.",
                        'warning'
                    )
                    error = true;
                } else {
                    var parent = $(this).closest('tbody').parent();
                    var time;
                    switch (parent.attr('id')) {
                        case 'breakTime0':
                            time = { day: 'Monday', from: $(this).val() };
                            break;
                        case 'breakTime1':
                            time = { day: 'Tuesday', from: $(this).val() };
                            break;
                        case 'breakTime2':
                            time = { day: 'Wednesday', from: $(this).val() };
                            break;
                        case 'breakTime3':
                            time = { day: 'Thursday', from: $(this).val() };
                            break;
                        case 'breakTime4':
                            time = { day: 'Friday', from: $(this).val() };
                            break;
                        case 'breakTime5':
                            time = { day: 'Saturday', from: $(this).val() };
                            break;
                        case 'breakTime6':
                            time = { day: 'Sunday', from: $(this).val() };
                            break;
                        default:
                            break;
                    }
                    if(time != null){
                        timefrom.push(time);
                    }
                    
                }

            });


            $('.timeTo').each(function (i, obj) {
                if ($(this).val() == "" || $(this).val() == null) {
                    swal(
                        "Failed to update",
                        "You can't leave break time empty. Please try again.",
                        'warning'
                    )
                    error = true;
                } else {
                    var parent = $(this).closest('tbody').parent();
                    var time;
                    switch (parent.attr('id')) {
                        case 'breakTime0':
                            time = { day: 'Monday', to: $(this).val() };
                            break;
                        case 'breakTime1':
                            time = { day: 'Tuesday', to: $(this).val() };
                            break;
                        case 'breakTime2':
                            time = { day: 'Wednesday', to: $(this).val() };
                            break;
                        case 'breakTime3':
                            time = { day: 'Thursday', to: $(this).val() };
                            break;
                        case 'breakTime4':
                            time = { day: 'Friday', to: $(this).val() };
                            break;
                        case 'breakTime5':
                            time = { day: 'Saturday', to: $(this).val() };
                            break;
                        case 'breakTime6':
                            time = { day: 'Sunday', to: $(this).val() };
                            break;
                        default:
                            break;
                    }
                    
                    if (time != null) {
                        timeto.push(time);
                    }
                }
            });


            for (var i = 0; i < this.weeksBreak.length; i++) {
                this.weeksBreak[i].durations = [];
                var k = 0;
                for (var j = 0; j < timefrom.length; j++) {
                    if (this.weeksBreak[i].day == timefrom[j].day && this.weeksBreak[i].day == timeto[j].day) {
                        // if(this.weeksBreak[i].durations[j] != null){
                        // console.log(this.weeksBreak[i].durations[j]);
                        // this.weeksBreak[i].durations[j].from = timefrom[j].from;
                        // this.weeksBreak[i].durations[j].to = timeto[j].to;
                        this.weeksBreak[i].durations[k] = { from: timefrom[j].from, to: timeto[j].to };
                        k++;
                        // }
                        // console.log(this.weeksBreak[i].durations[j]);        //DEBUG
                    }
                }
                console.log(this.weeksBreak[i].durations);       //DEBUG
            }

            console.log(this.weeksBreak);            //DEBUG
            // error && window.location.reload();           //if don't reload, newly added lines will be shown duplicated after added to weeksBreak durations

        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        })
    }


    // time off tab
    addTimeOff(){
        var today = new Date();
        this.processingTimeOff(0, moment(today).format("YYYY-MM-DD"), moment(today).format("YYYY-MM-DD"));
    }

    viewTimeOff(id){
        var toff;
        for (var i = 0; i < this.timeOffList.length; i++) {
            if (this.timeOffList[i].id == id) {
                toff = this.timeOffList[i];
            }
        }

        this.Booking.deleteEvent(id, this.timeOffList);
        this.processingTimeOff(id, moment(toff.start).format("YYYY-MM-DD"), moment(toff.end).format("YYYY-MM-DD") );
    }

    processingTimeOff(id, start,end){
        var today = new Date();
        var self = this;
        const fiveYearsBefore = today.getFullYear() - 5;
        const fiveYearsAfter = today.getFullYear() + 5;
        const randomID = "104";
        var toffid = id!=0?id:randomID;

        swal({
            title: 'Add Time off',
            html: '<div class="row">' +
            '<label style="margin-right:5px">Start time</label>' +
            '<input type="date" name="input" id="dateFrom" value="' + start + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required/>' +
            '<input type="time" name="input" id="timeFrom" value="00:00:00" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
            '</div>' +
            '<div class="row">' +
            '<label style="margin-right:5px">End time</label>' +
            '<input type="date" name="input" id="dateTo" value="' + end + '" placeholder="yyyy-MM-dd" min="' + fiveYearsBefore + '-01-01" max="' + fiveYearsAfter + '-12-31" required/>' +
            '<input type="time" name="input" id="timeTo" value="23:59:00" placeholder="08:00:AM" min="08:00:00" max="17:00:00" required/>' +
            '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (result: any) {
            const dateFrom = $('#dateFrom').val();
            const dateTo = $('#dateTo').val();
            const timeFrom = $('#timeFrom').val();
            const timeTo = $('#timeTo').val();

            var start = new Date(parseInt(dateFrom.substring(0, 4)), parseInt(dateFrom.substring(5, 7)) - 1, parseInt(dateFrom.substring(8, 10)), parseInt(timeFrom.substring(0, 2)), parseInt(timeFrom.substring(3, 5)));
            var end = new Date(parseInt(dateTo.substring(0, 4)), parseInt(dateTo.substring(5, 7)) - 1, parseInt(dateTo.substring(8, 10)), parseInt(timeTo.substring(0, 2)), parseInt(timeTo.substring(3, 5)));

            var newToff = {
                "id": toffid,
                "displayFrom": start.getDate() + ' ' + self.month[start.getMonth()] + ' ' + start.getFullYear() + ', ' + moment(start).format("HH:mm"),
                "displayTo": end.getDate() + ' ' + self.month[end.getMonth()] + ' ' + end.getFullYear() + ', ' + moment(end).format("HH:mm"),
                "start": start,
                "end": end
            };

            self.timeOffList.push(newToff);
            // update DB

        });


    }
   
}
