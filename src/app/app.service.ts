import { Injectable } from '@angular/core';
import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class appService {
//links are moved to dashboard.component.ts as inputs
questionEdit = {};
    constructor(private http: Http) { }

    getJson(link): Promise<JSON[]>{
        return new Promise((resolve,reject) =>{

            var testJson = this.http.get(link)
                .map(res => res.json())
                .catch(error => {
                    console.log(error);
                    return Observable.throw(error);
                })
                .subscribe(val => {
                    resolve(val);
                });

        })
        
    }

    postJson(link, obj){
        this.http.post(link, JSON.stringify(obj));
    }

}