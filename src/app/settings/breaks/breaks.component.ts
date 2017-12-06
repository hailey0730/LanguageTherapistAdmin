import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './breaks.component.html',
    styleUrls: [],
    providers: [appService]
})
export class BreaksComponent implements OnInit, AfterViewInit {
    
    public admin: any[];
    public workingHr: any[] = [moment(new Date(0, 0, 0, 9, 30)).format("HH:mm"), moment(new Date(0, 0, 0, 18, 0)).format("HH:mm")];
    public weeks: any[] = [{ day: 'Monday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }] },
        { day: 'Tuesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]},
        { day: 'Wednesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]},
        { day: 'Thursday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]},
        { day: 'Friday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]},
        { day: 'Saturday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]},
        { day: 'Sunday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }]}];

    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
       // set value of the input fields
        this.admin = ["../assets/img/faces/avatar.jpg", "Tania", "Andrew", "bd546139", "66443347", "hayhay0730@gmail.com",
            "somewhere over the rainbow", "HK", "China", "some description"];
            console.log(this.weeks);

        $("#breakTable").on('click', '#delete', function(event){
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

            // console.log('test add another method');
            // var duration = { from: moment(new Date(0, 0, 0, 9, 30)).format("HH:mm"), to: moment(new Date(0, 0, 0, 18, 0)).format("HH:mm") };
            // console.log(duration);
            // switch ($(tbody).attr('id')) {
            //     case 'breakTime0':
            //         this.weeks[0].durations.push(duration);
            //         console.log(this.weeks[0].durations);
            //         break;
            //     case 'breakTime1':
            //         this.weeks[1].durations.push(duration);
            //         break;
            //     case 'breakTime2':
            //         this.weeks[2].durations.push(duration);
            //         break;
            //     case 'breakTime3':
            //         this.weeks[3].durations.push(duration);
            //         break;
            //     case 'breakTime4':
            //         this.weeks[4].durations.push(duration);
            //         break;
            //     case 'breakTime5':
            //         this.weeks[5].durations.push(duration);
            //         break;
            //     case 'breakTime6':
            //         this.weeks[6].durations.push(duration);
            //         break;
            //     default:
            //         break;
            // }

        }); 
    }
    
    ngAfterViewInit() {
       
    }

    update(){
        swal({
            title: "Working hours changed",
            text: "Are you sure about this change?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            // console.log(this.weeks);        //DEBUG
           var timefrom = [];
           var timeto = [];
           var error = false;

            // update weeks to DB
            $('.timeFrom').each(function(i,obj){
                if($(this).val()==""||$(this).val() == null ){
                    swal(
                        "Failed to update",
                        "You can't leave break time empty. Please try again.",
                        'warning'
                    )
                    error = true;
                }else{
                    var parent = $(this).closest('tbody').parent();
                    console.log($(this).val());
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
                    timefrom.push(time);
                }
                
            });
            

            $('.timeTo').each(function(i,obj){
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
                timeto.push(time);
            }
            });

            console.log(timefrom);
            console.log(timeto);

            for(var i = 0; i < this.weeks.length; i ++){
                this.weeks[i].durations = [];
                var k = 0;
                for(var j = 0; j < timefrom.length; j ++){
                    if(this.weeks[i].day == timefrom[j].day && this.weeks[i].day == timeto[j].day){
                        // if(this.weeks[i].durations[j] != null){
                            // console.log(this.weeks[i].durations[j]);
                            // this.weeks[i].durations[j].from = timefrom[j].from;
                            // this.weeks[i].durations[j].to = timeto[j].to;
                            this.weeks[i].durations[k] = {from:timefrom[j].from,to:timeto[j].to};
                            k++;
                        // }
                        // console.log(this.weeks[i].durations[j]);        //DEBUG
                    }
                }
                console.log(this.weeks[i].durations);       //DEBUG
            }

            console.log(this.weeks);            //DEBUG
            // error && window.location.reload();           //if don't reload, newly added lines will be shown duplicated after added to weeks durations
              
        }, function (dismiss) {
            if (dismiss === 'cancel') {
               
            }
        })
    }

    
}
