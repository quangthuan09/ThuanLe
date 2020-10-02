import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { MainComponent } from "./main/main.component";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { ForgetPassComponent } from "./login/forgetpass/forgetpass.component";
import { RegisterComponent } from "./register/register.component";
import { AddNuskinComponent } from "./addnuskin/addnuskin.component";
import { SupportComponent } from "./support/support.component";
import { MainContactComponent } from "./main-contact/main-contact.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { ContactService } from "./service/contact.service";
import { PagerModule } from 'nativescript-pager/angular';
import { MainMessageComponent } from "./main-message/main-message.component";
import { MapsComponent } from "./maps/maps.component";
import { MainGetNumberComponent } from "./main-getnumber/main-getnumber.component";
import { LoginService } from "./service/login.service";
import { ScannerModalComponent } from "./scanner-modal/scanner-modal.component";
import { MainStatusNumberComponent } from "./main-statusnumber/main-statusnumber.component";
import { MessageContactReceptionComponent } from "./message-contact/message-contact-reception/message-contact-reception.component";
import { MessageContactOderComponent } from "./message-contact/message-contact-order/message-contact-order.component";
import { MessageContactDeliveryComponent } from "./message-contact/message-contact-delivery/message-contact-delivery.component";
import { FirebaseService } from "./service/firebase.service";
import { MainGetOrderComponent } from "./main-getorder/main-getorder.component";
import { ThongKeComponent } from "./thongke/thongke.component";
import { DataService } from "./service/data.service";

import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";



@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        PagerModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIChartModule,

       
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        ForgetPassComponent,
        RegisterComponent,
        AddNuskinComponent,
        SupportComponent,
        MainContactComponent,
        MainMessageComponent,
        MapsComponent,
        MainGetNumberComponent,
        ScannerModalComponent,
        MainStatusNumberComponent,
        MessageContactReceptionComponent,
        MessageContactOderComponent,
        MessageContactDeliveryComponent,
        MainGetOrderComponent,
        ThongKeComponent
        
    ],
    providers:[
        ContactService,
        LoginService,
        FirebaseService,
        DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ 
        
        ScannerModalComponent,
    ]
})
export class AppModule { }
