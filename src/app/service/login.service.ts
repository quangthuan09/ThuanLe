import { Injectable } from "@angular/core";
import { HttpClient, } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "../model/user.model";
import { Config } from "../config";



@Injectable({
    providedIn: "root"

})
export class LoginService {
    username: string;
    config: any;

    user : any;
    constructor(private http: HttpClient) {
        this.config = new Config();
    }
    validateForm(user: User) {
        if (!user.email && !user.password) {
            return "Tên Đăng Nhập và Mật Khẩu không được để trống"
        }
        if (!user.password) {
            return "Mật khẩu không được để trống";
        }
        if (!user.email) {
            return "Tên đăng nhập không được để trống";
        }
    }

    authenticated(user: User) {
        console.log(user);
        if (!user.email || !user.password) {
            console.log("rỗng");
            return throwError("Please provide both an email address and password.");
        }
        return this.http.post(
            this.config.apiUrl + "authentication/login",
            JSON.stringify({
                username: user.email,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        ).pipe(
            // tap((response)=>{
            //     console.log(response["result"]['userInfo'][0]);
            //     this.user = response["result"]['userInfo'][0]; 
            // }),
            catchError(this.handleErrors)
        );
    }

    getCommonHeaders() {
        return {
            "Content-Type": "application/json",
        }
    }

    handleErrors(error: Response) {
        // console.log(JSON.stringify(error));
        return throwError(error);
    }

}