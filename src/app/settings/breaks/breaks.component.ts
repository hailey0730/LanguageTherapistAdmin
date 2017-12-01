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
    public weeks: any[] = [{ day: 'Monday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1] }] },
        { day: 'Tuesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1]}]},
        { day: 'Wednesday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1]}]},
        { day: 'Thursday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1]}]},
        { day: 'Friday', switch: true, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1]}]},
        { day: 'Saturday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1]}]},
        { day: 'Sunday', switch: false, durations: [{ from: this.workingHr[0], to: this.workingHr[1] }, { from: this.workingHr[0], to: this.workingHr[1] }] }];

    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
       // set value of the input fields
        this.admin = ["../assets/img/faces/avatar.jpg", "Tania", "Andrew", "bd546139", "66443347", "hayhay0730@gmail.com",
            "somewhere over the rainbow", "HK", "China", "some description"];

            
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
            console.log(this.weeks);        //DEBUG
           
            // update weeks to DB
              
        }, function (dismiss) {
            if (dismiss === 'cancel') {
               
            }
        })
    }

    add(i){
        console.log('should add new line');
        var addBreak = '<div class="row">'+
            '<div class="col-md-4" * ngIf="week.from != null;" >' +
                '<label style="margin-right:5px">From</label>' +
            '<input type= "time" name= "input" id= "timeFrom" style= "margin: 10px 0 10px 0;" value= "{{week.to}}"[(ngModel)] = "week.to" placeholder= "08:00:AM" min= "08:00:00"' +
            'max = "17:00:00" required/>' +
            '</div>' +
            '<div class="col-md-4" * ngIf="week.to != null;" >' +
                '<label style="margin-right:5px" >To</label>' +
                    '<input type= "time" name= "input" id= "timeFrom" style= "margin: 10px 0 10px 0;" value= "{{week.to}}"[(ngModel)] = "week.to" placeholder= "08:00:AM" min= "08:00:00"' +
        'max = "17:00:00" required/>' +
            '</div>' +
            '<div class="col-md-4" >' +
                '<button type="submit" class="btn btn-danger btn-round simple"(click) = "delete()" style= "vertical-align: text-bottom;" >' +
                    '<i class="material-icons"> delete </i> ' +
                        '</button>' +
                        '</div>' +
                        '</div>' ;
        
        $('#breakTime'+i).append(addBreak);
    }
}
