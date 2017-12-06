import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './accountDetails.component.html',
    styleUrls: [],
    providers: [appService]
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
    
    public admin: any[];
    public adminPic: string;
    private admininfoLink = 'http://testingtesttest.000webhostapp.com/adminInfo.php';
    private admininfoPostLink = 'http://testingtesttest.000webhostapp.com/adminInfo.json';

    constructor(private appService: appService) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {
       // set value of the input fields
        // this.admin = ["../assets/img/faces/avatar.jpg", "Tania", "Andrew", "bd546139", "66443347", "hayhay0730@gmail.com",
        //     "somewhere over the rainbow", "HK", "China", "some description"];
        // this.admin[0] != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');
        this.appService.getJson(this.admininfoLink).then((data)=>{
            console.log(data);
            this.admin = data['Admin'];
            this.adminPic = this.admin[0] == ""?"../../assets/img/placeholder.jpg":this.admin[0];

            this.admin[0] != "" ? $('#picDiv').addClass('fileinput-exists') : $('#picDiv').addClass('fileinput-new');
        })

            
    }
    
    ngAfterViewInit() {
       
    }

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
            this.admin[0] = $('#pic').val()==""?this.admin[0]:$('#pic').val();
            this.admin[1] = $('#fn').val();
            this.admin[2] = $('#ln').val();
            this.admin[3] = $('#phone').val();
            this.admin[4] = $('#mobile').val();
            this.admin[5] = $('#email').val();
            this.admin[6] = $('#addr').val();
            this.admin[7] = $('#city').val();
            this.admin[8] = $('#country').val();
            this.admin[9] = $('textarea').val();
           
            console.log(this.admin);        //DEBUG

            // update info to DB
            var updateAdmin = {"Admin":this.admin};
            this.appService.postJson(this.admininfoPostLink, updateAdmin);
              
        }, function (dismiss) {
            if (dismiss === 'cancel') {
               
            }
        })
    }
   
}
