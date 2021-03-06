import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';

declare var android

@Component({
    selector: "ForgetPass",
    templateUrl: "./forgetpass.component.html",
    styleUrls: ['./forgetpass.component.css']
})
export class ForgetPassComponent implements OnInit {
    sdt= "";
    email = "";
    errorsdt = "";
    erroremail = "";
    isWrong = false;
    isWrongEmail = false;
    isBusy: boolean = true;
    constructor(private page:Page,private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }
    onLabelLoaded(event: EventData) {
        const label = <Label>event.object;
        let text = label.text;
        if(isAndroid)
        {
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
        }else if(isIOS){
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
    tapBack(){
        this.routerExtensions.back();
    }
    tapForget(){
        if(!this.sdt )
        {
            this.isWrong = true;
            this.errorsdt = "Vui lòng nhập số điện thoại";
            console.log("sdt sai");
        }
        else if(this.sdt.length <10 || this.sdt.length >11 ) 
        {
            this.isWrong = true;
            this.errorsdt = "SDT chưa hợp lệ!";
            console.log("sdt phải 10 ký tự");
        }
        else{
            
            this.errorsdt = "";
            console.log("thuận");
        }
        if(!this.email )
        {
         this.isWrongEmail = true;
         this.erroremail = "Vui lòng nhập địa chỉ email";
            console.log("email sai");      
        }
        else if(!this.validateEmail(this.email)){
            this.erroremail = "Sai định dạng email"
            console.log("sai định dạng email");
            setTimeout(() => {
                 this.isWrongEmail = false;
                 this.erroremail = "";
            },3000);
        }         
     }
     validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validate() {
        const email = "";
        if (this.validateEmail(email)) {
          this.erroremail =email + " is valid :)";
        } else {
            this.erroremail =email + " is not valid :)";
        }
        return false;
      }
}