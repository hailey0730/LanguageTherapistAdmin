import * as moment from 'moment';
declare const swal: any;
declare const $: any;

export class Booking{
    public businessHours = [ // specify an array instead
        {
            dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
            start: '08:00', // 8am
            end: '18:00' // 6pm
        }
    ];
    public breakTime = [ // specify an array instead
        {
            dow: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
            start: '12:00',
            end: '13:30'
        }
    ];
    public workingHours = [];
    public workdays = [];
    public custStaffHtmlTemp = '<input class="form-control" placeholder="Name" id="newName" >' +
    '<input class="form-control" placeholder="E-mail" type="email" id="newEmail" >' +
    '<input class="form-control" placeholder="Mobile" type="tel" id="newMobile" >';



    //input: (business hours)array, (break time)array
    //output: {workingHours:array,workDays:array}
    public calculateWorkingHours(businessHr, breaks) {          
        var wkhr = [];
        var wkdays = []

        for (var i = 0; i < businessHr.length; i++) {
            var bdow = businessHr[i].dow;
            var temp1 = { dow: [], start: '', end: '' };
            var temp2 = { dow: [], start: '', end: '' };
            for (var j = 0; j < bdow.length; j++) {
                // console.log(this.breakTime[i].dow.indexOf(bdow[j]));
                if (breaks[i].dow.indexOf(bdow[j]) != -1) {
                    temp1.dow[j] = bdow[j];
                    wkdays.push(bdow[j]);
                }
            }
            if (temp1.start == '') {
                temp1.start = businessHr[i].start;
                temp1.end = breaks[i].start;
                temp2.dow = temp1.dow;
                temp2.start = breaks[i].end;
                temp2.end = businessHr[i].end;
                wkhr.push(temp1);
                wkhr.push(temp2);
            }

        }
        return { workingHours: wkhr, workDays: wkdays };
    }

    //input:(start date, time, end date, time, recur time, obj index, avoid weekend index) int..., array
    //output:{ start: Date, end: Date, class: string, recur: bool, daily: bool, weekly: bool, monthly: bool, annually: bool, K: int }
    public custStartCustEnd(sy, sm, sd, sh, smin, ey, em, ed, eh, emin, times, i, k, workdays) {
        var customStart;
        var customEnd;
        var customClass;
        var r = false;
        var d = false;
        var m = false;
        var w = false;
        var a = false;

        if (times == 1) {
            customStart = new Date(sy, sm, sd, sh, smin);
            customEnd = new Date(ey, em, ed, eh, emin);
            customClass = 'event-green';
        } else if (times == 3) {
            customStart = new Date(sy + i, sm, sd, sh, smin);
            customEnd = new Date(ey + i, em, ed, eh, emin);
            customClass = 'event-red';
            r = true;
            a = true;

            while (workdays.indexOf(customStart.getDay()) == -1) {
                customStart = new Date(sy + i, sm, sd + k, sh, smin);
                customEnd = new Date(ey + i, em, ed + k, eh, emin);
                k++;
            }
            k = 0;
        } else if (times == 6) {
            customStart = new Date(sy, sm + i, sd, sh, smin);
            customEnd = new Date(ey, em + i, ed, eh, emin);
            customClass = 'event-orange';
            r = true;
            m = true;

            while (workdays.indexOf(customStart.getDay()) == -1) {
                customStart = new Date(sy, sm + i, sd + k, sh, smin);
                customEnd = new Date(ey, em + i, ed + k, eh, emin);
                k++;
            }
            k = 0;
        } else if (times == 5) {
            customStart = new Date(sy, sm, sd + (7 * i), sh, smin);
            customEnd = new Date(ey, em, ed + (7 * i), eh, emin);
            customClass = 'event-rose';
            r = true;
            w = true;
        } else if (times == 7) {
            customStart = new Date(sy, sm, sd + i + k, sh, smin);
            customEnd = new Date(ey, em, ed + i + k, eh, emin);
            customClass = 'event-azure';
            r = true;
            d = true;
            // console.log('day' + customStart.getDay());       //DEBUG
            while (workdays.indexOf(customStart.getDay()) == -1) {
                k++;
                customStart = new Date(sy, sm, sd + i + k, sh, smin);
                customEnd = new Date(ey, em, ed + i + k, eh, emin);

                // console.log(customStart);        //DEBUG
                // console.log('loop' + k);         //DEBUG
            }
        }
        // console.log({ start: customStart, end: customEnd });        //DEBUG
        return { start: customStart, end: customEnd, class: customClass, recur: r, daily: d, weekly: w, monthly: m, annually: a, K: k };
    }

    //input:int...(event start and end time, working session time)
    //output:bool
    public checkClosed(timeFromHour, timeFromMin, timeToHour, timeToMin, morningFromHour, morningFromMin, morningToHour, morningToMin, afternoonFromHour, afternoonFromMin, afternoonToHour, afternoonToMin){
        var closed = false;
        if (timeFromHour < morningFromHour || timeFromHour > afternoonToHour - 1) {
           closed = true;
        } else if (timeFromHour > timeToHour) {
            closed = true;
        } else if (timeToHour > afternoonToHour) {
            closed = true;
        } else if (timeToHour == afternoonToHour && timeToMin > afternoonToMin) {
            closed = true;
        } else if (timeFromHour > morningToHour - 1 && timeFromHour < afternoonFromHour) {
            closed = true;
        } else if (timeFromHour == morningToHour && timeFromMin > morningToMin) {
            closed = true;
        } else if (timeFromHour == afternoonFromHour && timeFromMin < afternoonFromMin) {
            closed = true;
        } else if (timeToHour > morningToHour && timeToHour < afternoonFromHour + 1) {
            closed = true;
        } else if (timeToHour == afternoonFromHour && timeToMin < afternoonFromMin) {
            closed = true;
        } else if (timeToHour == morningToHour && timeToMin > morningToMin) {
            closed = true;
        }
        return closed;
    }


    
    //input: (id)int, array
    //output:{ recur: str, annually: str, monthly: str, weekly: str, daily: str }
    public loadRecur(id, list) {
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


    // input: (customer/staff/service category)str, obj structure, list 
    public addNew(obj, htmlTemp, objTemplate, list){
        var title = 'Add New '+ obj;
        swal({
            title: title,
            html: htmlTemp,
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

           

            if(obj != "Category"){
                objTemplate.id = randomID;
                objTemplate.name = name;
                objTemplate.mobile = mobile;
                objTemplate.email = email;
            }else{
                objTemplate = name;
            }

            list.push(objTemplate);

            // update DB

        });
    }

    //input: (id)int, array
    public deleteEvent(id, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list.splice(i, 1);
                i--;
            }
        }
    }
    
}