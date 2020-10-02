import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, Inject } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, Color } from "tns-core-modules/ui/page";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { Promo } from "../model/promo.model";
import { ContactService } from "../service/contact.service";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import * as utils from "tns-core-modules/utils/utils";
import { setString, getString, remove } from "tns-core-modules/application-settings";
import { LoginService } from "../service/login.service";
import { LoadingIndicatorService } from "../service/loading-indicator.service";
import { User } from "../model/user.model";
import { Indicator } from "nativescript-pager/pager.common";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";

declare var android
@Component({
    selector: "Main",
    templateUrl: "./main.component.html",
    providers: [LoginService, LoadingIndicatorService],
    styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit, OnInit {
    mainindex: number;
    numItems;
    promo: Promo[];

    loadingPager: boolean;
    currentPagerIndex :number;
    latestReceivedIndex = 0;
    id: any;
    itemsDotted: any;
    items: ObservableArray<any>;
    username: string;
    user : any;

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private contactService: ContactService,
        private loginService: LoginService,
        private loadingIndicatorService: LoadingIndicatorService) {

        this.page.actionBarHidden = true;
        this.loadingPager = false;
        this.items = new ObservableArray();
        this.itemsDotted = [];
        this.currentPagerIndex = 0;
        this.mainindex = 0;

    }

    @ViewChild('pager', { static: true }) pager: ElementRef;
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngOnInit(): void {
        this.loadingIndicatorService.hide();
        this.username = getString("username", "");
        console.log(this.loginService.user);
        this.contactService.getContact()
            .subscribe((response) => {
                this.loadingPager = true;
                this.promo = response["promo"];
                this.items = new ObservableArray(this.promo);
                this.pagerSwich();
            })
    }
    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
    }
    pagerSwich() {
        this.id = setInterval(() => {
            if (this.currentPagerIndex == (this.items.length - 1)) {
                this.currentPagerIndex = 0;
                return;
            } else {
                this.currentPagerIndex = this.currentPagerIndex + 1;
            }
        }, 4000);
        for (var i = 0; i < this.items.length; i++) {
            this.itemsDotted.push(i);
        }
    }
    loaded(index: number) {
        console.log('view loaded', index);
    }
    loadedImage($event) {
        console.log(`loaded image ${$event}`);
    }
    prevPage() {
        const newIndex = Math.max(0, this.currentPagerIndex - 1);
        this.currentPagerIndex = newIndex;
        this.latestReceivedIndex = newIndex;
    }
    nextPage() {
        const newIndex = Math.min(this.numItems - 1, this.currentPagerIndex + 1);
        this.currentPagerIndex = newIndex;
        this.latestReceivedIndex = newIndex;
    }
    public openDrawer() {
        this.drawer.showDrawer();
    }
    openQC(url: string) {
        utils.openUrl(url);
    }
    onIndexChanged($event) {
        this.latestReceivedIndex = $event.value;
        this.currentPagerIndex = $event.value;
    }
    pageChanged(index: number) {
        console.log(`pageChanged ${JSON.stringify(index)}`);
    }
    tapMain() {
        this.mainindex = 0;
    }
    async tapHistory() {
        this.loadingIndicatorService.show("",{ color: '#1488CC' });
        await new Promise(resolve => setTimeout(resolve, 300));
        this.mainindex = 1;
        this.loadingIndicatorService.hide();
    }
    tapAccount() {
        this.mainindex = 2;
    }
    dottedActive(item: number) {
        if (item == this.currentPagerIndex) {
            return "dotted_active";
        }
        return "dotted";
    }
    openMessage() {
        this.routerExtensions.navigate(['/mainmessage'], { animated: true, transition: { name: "slide" } });
    }
    openMaps() {
        this.routerExtensions.navigate(['/maps'], { animated: true, transition: { name: "slide" } });
    }
    openGetNumberPickup() {
        this.routerExtensions.navigate(['/maingetnumber'], { animated: true, transition: { name: "slide" } });
    }
    openStatusNumber() {
        this.routerExtensions.navigate(['/mainstatusnumber'], { animated: true, transition: { name: "slide" } });
    }
    tapContact() {
        this.routerExtensions.navigate(['/maincontact'], { animated: true, transition: { name: "slide" } });
    }
    thongke(){
        this.routerExtensions.navigate(['/thongke'], { animated: true, transition: { name: "slide" } });
    }
    tapMessage() {
        this.routerExtensions.navigate(['/mainmessage'], { animated: true, transition: { name: "slide" } });
    }
    tapSupport() {
        this.routerExtensions.navigate(['/support'], { animated: true, transition: { name: "slide" } });
    }
    tapExit() {
        confirm({
            title: "Thoát app",
            message: "Bạn có muốn thoát app ?",
            okButtonText: "Có",
            cancelButtonText: "Không",
        }).then((result) => {
            if(result == true){
                android.os.Process.killProcess(android.os.Process.myPid());
                    }      
            // The result property is true if the dialog is closed with the OK button, false if closed with the Cancel button or undefined if closed with a neutral button.
            console.log("Dialog result: " + result);
        });
        
    }
    logout() {
        confirm({
            title: "Đăng xuất",
            message: "Bạn có muốn đăng xuất ?",
            okButtonText: "Có",
            cancelButtonText: "Không",
        }).then((result) => {
            if(result == true){
                        this.routerExtensions.navigate(['/login'], { animated: true, transition: { name: "slide" } });
                    }      
            // The result property is true if the dialog is closed with the OK button, false if closed with the Cancel button or undefined if closed with a neutral button.
            console.log("Dialog result: " + result);
        });
    }
}


