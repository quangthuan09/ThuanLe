import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, isAndroid, EventData, isIOS } from "tns-core-modules/ui/page";
import { Color } from '@nativescript/core/color';
import { Label } from '@nativescript/core/ui/label';
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { RegisterService } from "../service/register.service";
import { User } from "../model/user.model";
declare var android
@Component({
    selector: "Register",
    templateUrl: "./register.component.html",
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User;
    sdt = "";
    email = "";
    password = "";
    repassword = "";
    errorsdt = "";
    erroremail = "";
    errorpass = "";
    errorrepass = "";
    isWrong = false;
    isWrongEmail = false;
    isWrongPass = false;
    isWrongRePass = false;
    @ViewChild('passwordField', { static: false }) passwordField: ElementRef;
    @ViewChild('passwordField1', { static: false }) passwordField1: ElementRef;
    constructor(private page: Page, private routerExtensions: RouterExtensions, private registerService: RegisterService) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    ngOnInit(): void {
    }
    onScroll(args: ScrollEventData) {
        const scrollView = args.object as ScrollView;

        console.log("scrollX: " + args.scrollX);
        console.log("scrollY: " + args.scrollY);
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
    tapBack() {
        this.routerExtensions.back();
    }
    tapResignter() {
        this.kiemtrahople();
        if (this.user.sdt && this.user.email && this.user.password && this.repassword == this.user.password) {
            this.registerService.authenticated(this.user)
                .subscribe((response) => {
                    if (response['status'] == "SUCCESS") {

                        console.log("đúng rồi")
                        this.routerExtensions.back();
                    }
                });
            console.log("không còn lỗi gì hết")
        } else {
            console.log("lỗi tè le");
        }

    }
    kiemtrahople() {
        if (!this.user.sdt) {
            this.isWrong = true;
            this.errorsdt = "Vui lòng nhập số điện thoại";
            console.log("sdt sai");
        }
        else if (this.user.sdt.length < 10 || this.user.sdt.length > 11) {
            this.isWrong = true;
            this.errorsdt = "SDT chưa hợp lệ!";
            console.log("sdt phải 10 ký tự");
        }
        else {
            this.isWrong = false;
            this.errorsdt = "";
            console.log("thuận");
        }
        if (!this.user.email) {
            this.isWrongEmail = true;
            this.erroremail = "Vui lòng nhập địa chỉ email";
            console.log("email sai");
        }
        else if (!this.validateEmail(this.user.email)) {
            this.erroremail = "Sai định dạng email"
            console.log("sai định dạng email");
            setTimeout(() => {
                this.isWrongEmail = false;
                this.erroremail = "";
            }, 3000);
        }
        if (!this.validatePass(this.user.password)) {
            this.isWrongPass = true;
            this.errorpass = "mật khẩu bao gồm 8 ký tự bao gồm chữ hoa, chữ thường, ký tự đặc biệt"
            console.log("pass đểu");
        }
        else {
            this.isWrongPass = false;
            console.log("pass vip");
        }
        if (this.user.password != this.repassword) {
            this.isWrongRePass = true;
            this.errorrepass = "Vui lòng nhập đúng mật khẩu";
            setTimeout(() => {
                this.errorrepass = "";
                this.isWrongRePass = false;
            }, 2000);
            console.log("sai mật khẩu nhập lại");
        }

    }
    validatePass(pass) {
        const regexPassword: any = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        // const regexPassword: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return regexPassword.test(String(pass).toLowerCase());
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    }
    toggleShow() {
        console.log(this.passwordField.nativeElement.secure);
        this.passwordField.nativeElement.secure = !this.passwordField.nativeElement.secure;
        this.passwordField1.nativeElement.secure = !this.passwordField1.nativeElement.secure;
    }
}