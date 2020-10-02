import { Component } from "@angular/core";
import { BackendService } from "./service/backend.service";
const firebase = require("nativescript-plugin-firebase");
const dialogs = require("ui/dialogs");
@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent {
  ngOnInit() {
    firebase.init({
      onMessageReceivedCallback: function(message) {
        dialogs.alert({
          title: "Push message: " + (message.title !== undefined ? message.title : ""),
          message: JSON.stringify(message.body),
          okButtonText: "W00t!"
        });
      },
      //persist should be set to false as otherwise numbers aren't returned during livesync
      persist: false,
      //storageBucket: 'gs://yowwlr.appspot.com',
      onAuthStateChanged: (data: any) => {
        if (data.loggedIn) {
          BackendService.token = data.user.uid;
        }
        else {
          BackendService.token = "";
        }
      }
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}
