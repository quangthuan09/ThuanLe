import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Label } from '@nativescript/core/ui/label';
import { Page, EventData, isAndroid, isIOS } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Color } from '@nativescript/core/color';
import { LoginService } from "../service/login.service";
import { User } from "../model/user.model";
import { LoadingIndicatorService } from "../service/loading-indicator.service";
import { setString, getString, remove } from "tns-core-modules/application-settings";
declare var android
@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    providers: [LoginService, LoadingIndicatorService],
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isBusy: boolean = false;
    user: User;
    isWrong = false;
    isLoggingin = true;
    checked = false;
    errorMessage = "";
    name: string;
    private router: Router;
    @ViewChild('CB1', { static: false }) FirstCheckBox: ElementRef;
    @ViewChild('passwordField', { static: false }) passwordField: ElementRef;
    constructor(private page: Page, private routerExtensions: RouterExtensions, private loginService: LoginService, private loadingIndicatorService: LoadingIndicatorService) {
        this.user = new User;
        // this.user.email = "quang123@gmail.com"
        // this.user.password = "Quang123@"
        this.page.actionBarHidden = true;
        console.log("Start App");
    }

    ngOnInit(): void {
        this.user.email = getString("username","");
        this.user.password = getString("password","");
    }
    onLabelLoaded(event: EventData) {
        const label = <Label>event.object;
        let text = label.text;
        if (isAndroid) {
            let textWidth = label.android.getPaint().measureText(text);
            let textShader = new android.graphics.LinearGradient(
                0.0,
                0.0,
                textWidth,
                label.android.getTextSize(),
                new Color("#f64f59").android,
                new Color("#12c2e9").android,
                android.graphics.Shader.TileMode.CLAMP
            );
            label.android.getPaint().setShader(textShader);
        } else if (isIOS) {
            let textWidth = label.ios.getPaint().measureText(text);
            let textShader = new android.graphics.LinearGradient(
                0.0,
                0.0,
                textWidth,
                label.android.getTextSize(),
                new Color("#f64f59").android,
                new Color("#12c2e9").android,
                android.graphics.Shader.TileMode.CLAMP
            );
            label.android.getPaint().setShader(textShader);
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const re : any = /(?:[a-z0-9!#$%&'\*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'\*+/=?^_`{|}~-]+)\*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])\*")@(?:(?:[a-z0-9](?:[a-z0-9-]\*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]\*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]\*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return re.test(String(email).toLowerCase());
        // return re.test(email);

    }
    tapLogin() {
        this.errorMessage = this.loginService.validateForm(this.user);
        this.isLoggingin = true;
        this.isWrong = false;
        this.KiemTraDN();
    }
    KiemTraDN(){
        this.loadingIndicatorService.show("",{ color: '#1488CC' });
        this.loginService.authenticated(this.user).subscribe( (response) => {
            if (response['status'] == "SUCCESS") {
                // alert("Your account was successfully created");
                setString("username", this.user.email);
                setString("password", this.user.password);
                this.routerExtensions.navigate(['/main']);
            }
            else if (!this.validateEmail(this.user.email)) {
                this.errorMessage = "Sai định dạng email";
                this.isWrong = true;
            }
            else {
                this.isWrong = true;
                this.errorMessage = "Sai Tên Đăng Nhập hoặc Mật Khẩu";
            }
            this.isLoggingin = false;
            this.loadingIndicatorService.hide();
        },
            (exception) => {
                if (exception.error && exception.error.description) {
                    console.dir(exception.error);
                } else {
                    console.dir(exception.error);
                }
                this.loadingIndicatorService.hide();
                this.isWrong = true;
            }
        );
    }
    toggleShow() {
        console.log(this.passwordField.nativeElement.secure);
        this.passwordField.nativeElement.secure = !this.passwordField.nativeElement.secure;
    }
    tapForgotPass() {
        this.routerExtensions.navigate(['/forgetpass'], { animated: true, transition: { name: "slide" } });
    }
    tapResignter() {
        this.routerExtensions.navigate(['/register'], { animated: true, transition: { name: "slide" } });
    }
    tapAddNumber() {
        this.routerExtensions.navigate(['/addnuskin'], { animated: true, transition: { name: "slide" } });
    }
    tapSupport() {
        this.routerExtensions.navigate(['/support'], { animated: true, transition: { name: "slide" } });
    }
    checkedremember() {
        if (this.checked == true) {

            this.checked = false;
            console.log("đã check");
        }
        else {
            // this.user.email = "";
            // this.user.password ="";
            this.checked = true;
            console.log(" chưa check");
        }

    }
}
