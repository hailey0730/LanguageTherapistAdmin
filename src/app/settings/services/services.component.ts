import { Component, OnInit, AfterViewInit } from '@angular/core';

import { appService } from '../../app.service';
import { Booking } from '../../bookingSystem/booking';

import * as moment from 'moment';
import 'moment/locale/pt-br';
declare const swal: any;
declare const $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './services.component.html',
    styleUrls: ['../css/subsidebar.css'],
    providers: [appService, Booking]
})
export class ServicesComponent implements OnInit, AfterViewInit {
    selectTheme = 'primary';
    selectedCat:any;
    selectedStaff:any;
    displayCategory:string;
    categories: any[] = ["cat 1"];
    displayServices:any[] = [];
    displayService:any;
    services: any[] = [
        { "id": 401, "categories": [ "cat 1"], "name": "service A", "duration": 30, "cost": 150, "description": "", "staff": ["Tania Andrew"] },
        { "id": 402, "categories": [], "name": "service B", "duration": 60, "cost": 300, "description": "", "staff": ["John Chan", "Tania Andrew"] }];
    staffList:any[] = ["Tania Andrew","John Chan"];
    catHtmlTemp = '<input class="form-control" placeholder="Category Name" id="newName" >' ;
   
    constructor(private appService: appService, private Booking: Booking) {
        
    }
    // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

    public ngOnInit() {

        setTimeout(function () { $('#subsidebar').addClass('selected'); }, 1000);     //need to wait till customers are loaded on the subsidebar
        this.displayCategory = "All services";
        this.displayServices = this.services;
    }
    
    ngAfterViewInit() {}

    displayCat(event, cat) {
        // unhighlight all
        $('li').removeClass('selected');

        // highlight selected
        var li = event.target.closest('li');
        $(li).addClass('selected');

        $('.tab-pane').removeClass('active');
        $('#main').addClass('active');

        // change view
        this.displayCategory = cat;
        this.displayServices = [];
        if (cat == "All services"){
            this.displayServices = this.services;
        }else{
            for (var i = 0; i < this.services.length; i++) {
                var categories = this.services[i].categories;
                for (var j = 0; j < categories.length; j++) {
                    if (categories[j] == cat) {
                        this.displayServices.push(this.services[i]);
                    }
                }
            }
        }
    }

    addCategory(){
        var newCat = "";

        this.Booking.addNew("Category", this.catHtmlTemp, newCat, this.categories);
    }

    updateService(id){
        var img = $('#pic').val() == "" ? "../../assets/img/placeholder.jpg" : $('#pic').val();
        var name = $('#name').val();
        var description = $('#description').val();
        var duration = $('#duration').val();
        var cost = $('#cost').val();
        var catModel;
        var staffModel;
        var serviceId;

        if (id == 0) {     //create new service
            catModel = this.selectedCat;
            staffModel = this.selectedStaff;
            serviceId = 405;       //random id
            
        } else {           //update existing service
            serviceId = id;
            var oldService;
            for(var i = 0; i < this.services.length; i ++){
                if(this.services[i].id == id){
                    oldService = this.services[i];
                    catModel = this.services[i].categories;
                    staffModel = this.services[i].staff;
                }
            }
            
            img = img == ""&&oldService.img;
            name = name == ""&&oldService.name;
            description = description == ""&&oldService.description;
            duration = duration == '' &&oldService.duration;
            cost = cost == ""&&oldService.cost;

            this.Booking.deleteEvent(id, this.services);
        }

        var newService = {
            "id": serviceId,
            "categories": catModel,
            "name": name,
            "duration": duration,
            "cost": cost,
            "description": description,
            "staff": staffModel,
            "img": img
        }

        this.services.push(newService);
        
        // console.log(catModel);      //DEBUG
        // console.log(staffModel);    //DEBUG
        $('.tab-pane').removeClass('active');
        $('#main').addClass('active');
       
        // update DB
    }


    viewService(id){
        $('.tab-pane').removeClass('active');
        $('#viewService').addClass('active');
        for(var i = 0; i < this.services.length; i ++){
            if(this.services[i].id == id){
                this.displayService = this.services[i];
            }
        }
        
    }


    removeService(event, id){
        $('.tab-pane').removeClass('active');
        $('#main').addClass('active');

        swal({
            title: "Delete service",
            text: "Are you sure you want to delete this service?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {

            for (var i = 0; i < this.services.length; i++) {
                if (this.services[i].id == id) {
                    this.services.splice(i, 1);
                    this.displayServices = this.services;
                    // need to handle if all services in a category is deleted, highlight all services in sidebar
                    $('li').removeClass('selected');
                    $('#subsidebar').addClass('selected');
                }
            }
        });
    }

    cancel(){
        $('.tab-pane').removeClass('active');
        $('#main').addClass('active');
    }

   
}
