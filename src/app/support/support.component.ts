import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';

declare var android

@Component({
    selector: "Support",
    templateUrl: "./support.component.html",
    styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
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
    
}