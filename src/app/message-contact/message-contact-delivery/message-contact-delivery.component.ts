import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';
import { ListView } from '@nativescript/core/ui/list-view';
import { TextField } from '@nativescript/core/ui/text-field';
import * as imagepicker from "nativescript-imagepicker";
import { Observable } from "rxjs/internal/Observable";

declare var android

@Component({
    selector: "MessageContactDelivery",
    templateUrl: "./message-contact-delivery.component.html",
    styleUrls: ['./message-contact-delivery.component.css']
})
export class MessageContactDeliveryComponent implements OnInit {
    public me: String;
    isSingleMode: boolean = true;
    imageAssets = [];
    imageSrc: any;
    thumbSize: number = 80;
    previewSize: number = 300;
    @ViewChild("list", { static: false }) lv: ElementRef;
    @ViewChild("textfield", { static: false }) tf: ElementRef;
    list: ListView;
    textfield: TextField;


    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        this.page.actionBarHidden = true;
    }
    public chats$: Observable<any>;
    public ngAfterViewInit() {
        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;
    }
    ngOnInit(): void {
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
    scroll(count: number) {
        console.log("scrolling to ", count)
        this.list.scrollToIndex(count - 1);
        this.list.refresh();
    }
    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }
    private startSelection(context) {
        let that = this;

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {
                console.log("Selection done: " + JSON.stringify(selection));
                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection;
            }).catch(function (e) {
                console.log(e);
            });
    }

}