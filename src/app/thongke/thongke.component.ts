import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { DataService } from "../service/data.service";
import { Country } from "../model/country.model";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Label } from '@nativescript/core/ui/label';
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import * as dialogs from "tns-core-modules/ui/dialogs";
declare var android

@Component({
    selector: "ThongKe",
    templateUrl: "./thongke.component.html",
    providers: [DataService],
    styleUrls: ['./thongke.component.css']
})
export class ThongKeComponent implements OnInit {
    mainindex : number;

    private _categoricalSource: ObservableArray<Country>;
    private _pieSource: ObservableArray<Country>;

    constructor(private routerExtensions: RouterExtensions,private page:Page,private _dataService: DataService) {
        this.page.actionBarHidden = true;
        this.mainindex = 0;
    }
    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    }
    get pieSource(): ObservableArray<Country> {
        return this._pieSource;
    }
    ngOnInit(): void {
        this._categoricalSource = new ObservableArray(this._dataService.getCategoricalSource());
        this._pieSource = new ObservableArray(this._dataService.getPieSource());
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
                new Color("#f12711").android,
                new Color("#f5af19").android,
                android.graphics.Shader.TileMode.CLAMP
            );
            label.android.getPaint().setShader(textShader);
        } 
    }
    save(){
        dialogs.alert({
            title: "Lỗi",
            message: "chức năng đang được lập trình",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
    }
    tapBack() {
        this.routerExtensions.back();
    }
    openLumi(){
        this.mainindex=0;
    }
    openEco(){
        this.mainindex=1;
    }
    openFace(){
        this.mainindex=2;
    }
    openBody(){
        this.mainindex=3;
    }
    openAccent(){
        this.mainindex=4;
    }
    openMe(){
        this.mainindex=5;
    }
}