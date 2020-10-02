import {Injectable} from "@angular/core";
import { HttpClient ,  } from "@angular/common/http";
import { Config } from "../config";
import { catchError, map, tap } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { User } from "../model/user.model";

@Injectable({
    providedIn:"root"

})
export class RegisterService{
    config: any;
    constructor(private http: HttpClient){
        this.config = new Config();
    }




    authenticated(user : User){
        console.log(user);
        
        return this.http.post(
            this.config.apiUrl + "authentication/register",
            JSON.stringify({
                username:user.email,
                password:user.password,
                fullname:user.sdt,
                email:user.VNIDNumber
            }),
           {headers:this.getCommonHeaders()}

        ).pipe(
            // console.dir(res)
           catchError(this.handleErrors)
        );
   
   }
   getCommonHeaders() {
    return {
        "Content-Type": "application/json",
    }
}   

handleErrors(error: Response) {
    console.log(JSON.stringify(error));
    return throwError(error);
}
}