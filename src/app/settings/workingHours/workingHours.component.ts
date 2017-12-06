import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './workingHours.component.html',
    styleUrls: [],
    providers: [appService]
})
export class WorkingHoursComponent implements OnInit, AfterViewInit {
    
    public admin: any[];
    public workingHr: any[] = [moment(new Date(0, 0, 0, 9, 30)).format("HH:mm"), moment(new Date(0, 0, 0, 18, 0)).format("HH:mm")];
    public weeks: any[] = [{day:'Monday',switch:true,from:this.workingHr[0], to:this.workingHr[1]},
        { day: 'Tuesday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
        { day: 'Wednesday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
        { day: 'Thursday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
        { day: 'Friday', switch: true, from: this.workingHr[0], to: this.workingHr[1] },
        { day: 'Saturday', switch: false, from: this.workingHr[0], to: this.workingHr[1] },
        { day: 'Sunday', switch: false, from: this.workingHr[0], to: this.workingHr[1] }];

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
            
            for(var i = 0; i < this.weeks.length; i ++){
                this.weeks[i].from = timefrom[i];
                this.weeks[i].to = timeto[i];
            }

            console.log(this.weeks);        //DEBUG
        }, function (dismiss) {
            if (dismiss === 'cancel') {
               
            }
        })
    }

    //Doesn't work================================================
    // highlight(event,i){
    //     console.log($(this.weeks[i].switch));     //DEBUG
    //     // var row = event.target.closest('.row');
    //     var tempInput = 'input[name = "switch'+ i +'"]:checked';
    //     if (this.weeks[i].switch == 'true') {
    //     // if ($(tempInput).val()=='on') {
    //         console.log("change background color");
    //     // if ($(tempInput).val() == 'on'){
    //         $(event.target).css('background-color', '#fdeeff');
    //         // $(row).css('background-color', '#fdeeff');
    //     }else{
    //         $(event.target).css('background-color', 'white');
    //         // $(row).css('background-color','white');
    //     }
    // }
   
}
