import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Contact } from "../model/contact.model";
import { Config } from "../config";
import { Promo } from "../model/promo.model";
import { Maps } from "../model/maps.model";
import { Guide } from "../model/guide.model";
import { UtilsService } from "./utils.service";





@Injectable()
export class ContactService {
    Contact:Contact;
    Promo : Promo;
    maps : Maps;
    guide : any;
    config: Config;
    private _mainData: any;
    public get mainData(): any {
        return this._mainData;
    }
    public set mainData(value: any) {
        this._mainData = value;
    }
    
    constructor(private http: HttpClient) {
        this.config = new Config();
        this.Contact = new Contact();
        this.maps=new Maps();        
    }
    
    getContact() {
        let headers = new HttpHeaders().set(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        let body = new HttpParams()
            .set("app_key", this.config.app_key)
            .set("ver", this.config.ver)
            .set("op", this.config.op)
            .set("act", this.config.act)
        return this.http.post(
            this.config.contactApi,
            body,

            { headers: headers }
        ).pipe(
             tap((response) =>{
                this.guide = response["guide"];
                this.maps.map_hcm = response["map_hcm"];
                this.maps.map_hn = response["map_hn"];
            })
        )
    }
}