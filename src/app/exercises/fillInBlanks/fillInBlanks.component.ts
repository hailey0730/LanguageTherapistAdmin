import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Chartist from 'chartist';
import { TagInputModule } from 'ngx-chips';

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
    styleUrls: ['./css/fb.css']
})
export class FillInBlanksComponent implements OnInit, AfterViewInit {
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
    public age: any;
    public options:any[];
    
    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {
        $('.ng2-tag-input__text-input[_ngcontent-c3]').css('background-color', 'transparent');
      
    }
    ngAfterViewInit() {
       
    }

    addQuestion(){
        console.log($('#question').val());
        console.log($('#answer').val());
        console.log(this.options);
        console.log(this.age);
    }
   
}
