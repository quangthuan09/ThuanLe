import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Label } from '@nativescript/core/ui/label';
import { Contact } from "../model/contact.model";
import { ContactService } from "../service/contact.service";
import * as TNSPhone from 'nativescript-phone';
import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import * as Email from "nativescript-email";
import { compose } from "nativescript-email";
import { openApp } from "nativescript-open-app";

declare var android
@Component({
    selector: "MainContact",
    templateUrl: "./main-contact.component.html",
    styleUrls: ['./main-contact.component.css']
})
export class MainContactComponent implements OnInit {
    loading : boolean;
    contact: Contact;
    time_work: string[];
    time_work_day: string;
    time_work_weekend: string;
    time_work_holiday: string;
    composeOptions : Email.ComposeOptions;
    constructor(private page: Page, private routerExtensions: RouterExtensions, private contactService: ContactService) {
        this.page.actionBarHidden = true;
        this.loading = false;

    }
    private drawer: RadSideDrawer;
    ngOnInit(): void {
        this.contactService.getContact()
            .subscribe((response) => {
                this.loading = true;
                this.contact = response["contact"];
                this.time_work = this.contact.time_work.split(".");
                this.time_work_day = this.time_work[0].trim();
                this.time_work_weekend = this.time_work[1].trim();
                this.time_work_holiday = this.time_work[2].trim();
                // console.log(this.contact.title_hcm);
            })
        console.log("bắt đầu slide");


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
                new Color("#4568DC").android,
                new Color("#B06AB3").android,
                android.graphics.Shader.TileMode.CLAMP
            );
            label.android.getPaint().setShader(textShader);
        }
    }
    tapBack() {
        this.routerExtensions.back();
    }
    callPhone(number: string) {
        console.log(number);
        const phoneNumber = number;
        TNSPhone.dial(phoneNumber, true);
    }
    onEmailSend(email :string){
        this.composeOptions = {
            to : [email]
        }
        Email.compose(this.composeOptions).then(result => {console.log(result)});
    }
    openWeb(urlWeb : string) {
        utils.openUrl("https://" + urlWeb);
    }
    openViber(number:string)
    {
        // openApp("com.viber.voip");
        var share = new android.content.Intent(android.content.Intent.ACTION_VIEW);
        share.setClassName("com.viber.voip", "com.viber.voip.WelcomeActivity");
        share.setData(android.net.Uri.parse("tel:" + android.net.Uri.encode(number)));
    
        application.android.context.startActivity(share);


        
    }

        tapMessageReception(){
            this.routerExtensions.navigate(['/messagecontactreception'], { animated: true, transition: { name: "slide" } });
        }
        tapMessageOrder(){
            this.routerExtensions.navigate(['/messagecontactorder'], { animated: true, transition: { name: "slide" } });
        }
        tapMessageDelivery(){
            this.routerExtensions.navigate(['/messagecontactdelivery'], { animated: true, transition: { name: "slide" } });
        }
}
