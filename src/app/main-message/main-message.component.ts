import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';
import { Action } from "rxjs/internal/scheduler/Action";

declare var android

@Component({
    selector: "MainMessage",
    templateUrl: "./main-message.component.html",
    styleUrls: ['./main-message.component.css']
})
export class MainMessageComponent implements OnInit {
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
    
  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
    tapMessageReception(){
        var idRoom = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();

        this.routerExtensions.navigate(['/messagecontactreception'], { animated: true, transition: { name: "slide" } });
    }
    tapMessageOrder(){
        this.routerExtensions.navigate(['/messagecontactorder'], { animated: true, transition: { name: "slide" } });
    }
    tapMessageDelivery(){
        this.routerExtensions.navigate(['/messagecontactdelivery'], { animated: true, transition: { name: "slide" } });
    }
}