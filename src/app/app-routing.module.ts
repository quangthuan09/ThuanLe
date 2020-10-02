import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { ForgetPassComponent } from "./login/forgetpass/forgetpass.component";
import { RegisterComponent } from "./register/register.component";
import { AddNuskinComponent } from "./addnuskin/addnuskin.component";
import { SupportComponent } from "./support/support.component";
import { MainContactComponent } from "./main-contact/main-contact.component";
import { MainMessageComponent } from "./main-message/main-message.component";
import { MapsComponent } from "./maps/maps.component";
import { MainGetNumberComponent } from "./main-getnumber/main-getnumber.component";
import { MainStatusNumberComponent } from "./main-statusnumber/main-statusnumber.component";
import { MessageContactReceptionComponent } from "./message-contact/message-contact-reception/message-contact-reception.component";
import { MessageContactOderComponent } from "./message-contact/message-contact-order/message-contact-order.component";
import { MessageContactDeliveryComponent } from "./message-contact/message-contact-delivery/message-contact-delivery.component";
import { MainGetOrderComponent } from "./main-getorder/main-getorder.component";
import { ThongKeComponent } from "./thongke/thongke.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full"},
    { path:"login", component:LoginComponent},
    { path:"main", component:MainComponent},
    { path:"forgetpass", component:ForgetPassComponent},
    { path:"register", component:RegisterComponent},
    { path:"addnuskin", component:AddNuskinComponent},
    { path:"support", component:SupportComponent},
    { path:"maincontact", component:MainContactComponent},
    { path:"mainmessage", component:MainMessageComponent},
    { path:"maps", component:MapsComponent},
    { path:"maingetnumber", component:MainGetNumberComponent},
    { path:"mainstatusnumber", component:MainStatusNumberComponent},
    { path:"messagecontactreception", component:MessageContactReceptionComponent},
    { path:"messagecontactorder", component:MessageContactOderComponent},
    { path:"messagecontactdelivery", component:MessageContactDeliveryComponent},
    { path:"maingetorder", component:MainGetOrderComponent},
    { path:"thongke", component:ThongKeComponent},
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
