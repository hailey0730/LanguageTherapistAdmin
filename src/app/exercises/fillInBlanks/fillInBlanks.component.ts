import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';
import { TagInputModule } from 'ngx-chips';
import { appService } from '../../app.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';

declare const swal: any;
declare const $: any;

TagInputModule.withDefaults({
    tagInput: {
        placeholder: 'Please enter other answers',
        // add here other default values for tag-input
    }
});

@Component({
    selector: 'app-dashboard',
    templateUrl: './fillInBlanks.component.html',
    styleUrls: ['./css/fb.css'],
    providers: [appService]
})
export class FillInBlanksComponent implements OnInit, AfterViewInit {
    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public age: any;
    public options:any[] = [];
    public questionAdded = false;
    questionEdit = window.sessionStorage.getItem('questionEdit');
    public questionEditQ: string = '';
    public questionEditA: string = '';
    
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };    

    private searchResult = "http://www.drcare.ai/Doctor/php/loadQA.php";


    public ngOnInit() {
        $('.ng2-tag-input__text-input[_ngcontent-c3]').css('background-color', 'transparent');

        // check if any ID pass by edit
        if(this.questionEdit != null){
            // auto complete form if edit
            this.questionAdded = true;
            // console.log(this.questionEdit);     //DEBUG
            this.appService.getJson(this.searchResult).then((data) => {
                this.questionEditQ = data[0]['Question'];
                this.questionEditA = data[0]['Answers'][0]['Answer'];
                // this.options = data[2]['Answers'];
                for(var i = 0; i < data[2]['Answers'].length; i ++){
                    var temp = data[2]['Answers'][i];
                    this.options.push(temp['Answer']);
                }
                this.age = 5;

                // console.log(this.results);       //DEBUG
            });
        }
        
      
    }
    ngAfterViewInit() {
       
    }

    addQuestion(){
        // pass question to DB to generate Question ID first (if this is new question) or 
        // update question if edit old question
        if ($('#question').val() != ''){
            this.questionAdded = true;
            this.questionEditQ = $('#question').val();
            console.log(this.questionEditQ);    //DEBUG
        }else{
            swal(
                "You haven't fill in the question yet!",
                '',
                'warning'
            )
        }

        
    }

    finish(){
        // pass answers or update old answers to DB
        console.log($('#answer').val());        //DEBUG
        console.log(this.options);      //DEBUG
        console.log(this.age);      //DEBUG

        // reset everything
        this.questionAdded = false;
        window.sessionStorage.removeItem('questionEdit');
        this.questionEditQ = '';
        this.questionEditA = '';
        this.options = [];
        this.age = '';

        var message = '';
        if(this.questionEdit != null){
            message = 'Question updated successfully!'
        }else{
            message = 'Question added successfully!';
        }

        swal(
            message,
            '',
            'success'
        )
    }
   
}
