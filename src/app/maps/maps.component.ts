import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS, View } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';
import { LoadingIndicatorService } from "../service/loading-indicator.service";
import { TestNavService } from "../service/test-nav.service";
import { Image } from "@nativescript/core/ui/image";
import { PanGestureEventData, PinchGestureEventData, GestureEventData } from 'tns-core-modules/ui/gestures';
import { ContactService } from "../service/contact.service";
import { Config } from "../config";
declare var android


let startScale = 1;
@Component({
    selector: "Maps",
    templateUrl: "./maps.component.html",
    providers: [LoadingIndicatorService, TestNavService],
    styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
    @ViewChild('imageMaps', { static: false }) ImageMaps: ElementRef;
    mainindex = 0;
    maps: any;
    config: Config;
    
    chooseImg: boolean;
    prevDeltaX: number;
    prevDeltaY: number;
    loading : boolean;
    @ViewChild("container", { static: false }) container: ElementRef;
    constructor(private page: Page, private routerExtensions: RouterExtensions, private loadingIndicatorService: LoadingIndicatorService, private testNavService: TestNavService, private contactService: ContactService
    ) {
        this.page.actionBarHidden = true;
        this.config = new Config();
        this.loading = false;

    }

    ngOnInit(): void {
 
        this.chooseImg = true;
        this.contactService.getContact()
            .subscribe(() => {
                this.loading = true;
                this.maps = this.contactService.maps;
            });
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
    onPan(args: PanGestureEventData) {
        console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
        if (args.state === 1) // down
        {
            this.prevDeltaX = 0;
            this.prevDeltaY = 0;

        }
        else if (args.state === 2) // panning
        {
            this.ImageMaps.nativeElement.translateX += args.deltaX - this.prevDeltaX;
            this.ImageMaps.nativeElement.translateY += args.deltaY - this.prevDeltaY;
            this.prevDeltaX = args.deltaX;
            this.prevDeltaY = args.deltaY;

            // let convFactor = this.ImageMaps.nativeElement.width / this.ImageMaps.nativeElement.getMeasuredWidth();
            // let edgeX = (this.container.nativeElement.getMeasuredWidth() - this.ImageMaps.nativeElement.getMeasuredWidth()) * convFactor;
            // let edgeY = (this.container.nativeElement.getMeasuredHeight() - this.ImageMaps.nativeElement.getMeasuredHeight()) * convFactor;

            // console.log('edgeY',this.prevDeltaX)
            // console.log('edgeX',this.prevDeltaY)
            // // X border
            // if (this.ImageMaps.nativeElement.translateX <0) {
            //     this.ImageMaps.nativeElement.translateX = 0;
            // }
            // else if (this.ImageMaps.nativeElement.translateX > edgeX) {
            //     this.ImageMaps.nativeElement.translateX = edgeX;
            // }

            // // Y border
            // if (this.ImageMaps.nativeElement.translateY < 0) {
            //     this.ImageMaps.nativeElement.translateY = 0;
            // }
            // else if (this.ImageMaps.nativeElement.translateY > edgeY) {
            //     this.ImageMaps.nativeElement.translateY = edgeY;
            // } 

        }
        else if (args.state === 3) // up
        {
            this.prevDeltaX = 0;
            this.prevDeltaY = 0;
        }



    }
    onPinch(args: PinchGestureEventData) {

        console.log("phóng to nhỏ");
        // if (args.state === 1) {
        //     const newOriginX = args.getFocusX() - this.ImageMaps.nativeElement.translateX;
        //     const newOriginY = args.getFocusY() - this.ImageMaps.nativeElement.translateY;

        //     const oldOriginX = this.ImageMaps.nativeElement.originX * this.ImageMaps.nativeElement.getMeasuredWidth();
        //     const oldOriginY = this.ImageMaps.nativeElement.originY * this.ImageMaps.nativeElement.getMeasuredHeight();

        //     this.ImageMaps.nativeElement.translateX += (oldOriginX - newOriginX) * (1 - this.ImageMaps.nativeElement.scaleX);
        //     this.ImageMaps.nativeElement.translateY += (oldOriginY - newOriginY) * (1 - this.ImageMaps.nativeElement.scaleY);

        //     this.ImageMaps.nativeElement.originX = newOriginX / this.ImageMaps.nativeElement.getMeasuredWidth();
        //     this.ImageMaps.nativeElement.originY = newOriginY / this.ImageMaps.nativeElement.getMeasuredHeight();

        //     startScale = this.ImageMaps.nativeElement.scaleX;
        // }

        // else if (args.scale && args.scale !== 1) {
        //     let newScale = startScale * args.scale;
        //     newScale = Math.min(8, newScale);
        //     newScale = Math.max(0.125, newScale);

        //     this.ImageMaps.nativeElement.scaleX = newScale;
        //     this.ImageMaps.nativeElement.scaleY = newScale;
        // }



    }
    onDoubleTap(args: GestureEventData) {
        console.log("DOUBLETAP");

        this.ImageMaps.nativeElement.animate({
            translate: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            curve: "easeOut",
            duration: 300
        }).then(function () {

        });


    }
    tapHCM() {
        this.mainindex = 0;
        this.chooseImg = true;
    }
    tapHN() {
        this.mainindex = 1;
        this.chooseImg = false;
    }
}