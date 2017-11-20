import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';
import { TagInputModule } from 'ngx-chips';
import { appService } from '../../app.service';


declare const $: any;

TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Please enter other answers',
        // add here other default values for tag-input
    }
});

@Component({
    selector: 'app-dashboard',
    templateUrl: './accountDetails.component.html',
    styleUrls: [],
    providers: [appService]
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public age: any;
    public options:any[];
    public questionAdded = false;
    questionEdit = window.sessionStorage.getItem('questionEdit');
    public questionEditQ: string;
    public questionEditA: string;
    
    private searchResult = "http://www.drcare.ai/Doctor/php/loadQA.php";


    public ngOnInit() {
        $('.ng2-tag-input__text-input[_ngcontent-c3]').css('background-color', 'transparent');
        if(this.questionEdit != null){
            this.questionAdded = true;
            console.log(this.questionEdit);
            this.appService.getJson(this.searchResult).then((data) => {
                this.questionEditQ = data[0]['Question'];
                // this.questionEditA = data[0][''];
                this.options = data[2]['Answers'];
                // this.age = ;

                // console.log(this.results);
            });
        }
        
      
    }
    ngAfterViewInit() {
       
    }

    addQuestion(){
        if ($('#question').val() != null || $('#question').val() != ""){
            this.questionAdded = true;
            console.log($('#question').val());
        }
    }

    finish(){
        console.log($('#answer').val());
        console.log(this.options);
        console.log(this.age);
        this.questionAdded = false;
        window.sessionStorage.setItem('questionEdit', "");
        this.questionEditQ = '';
        // this.questionEditA = data[0][''];
        this.options = [];
        // this.age = ;
    }
   
}
