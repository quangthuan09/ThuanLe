import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS  } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';
import { ListView } from '@nativescript/core/ui/list-view';
import { TextField } from '@nativescript/core/ui/text-field';

import * as imagepicker from "nativescript-imagepicker";
import { Observable } from "rxjs/internal/Observable";
import { Config } from "~/app/config";
import { FirebaseService } from "~/app/service/firebase.service";
import { LoginService } from "~/app/service/login.service";
import { ActivatedRoute } from "@angular/router";
import { getString } from 'tns-core-modules/application-settings';
const firebase = require("nativescript-plugin-firebase");
var fs = require("tns-core-modules/file-system");
var appPath = fs.knownFolders.currentApp().path;
declare var android

@Component({
    selector: "MessageContactReception",
    templateUrl: "./message-contact-reception.component.html",
  
    styleUrls: ['./message-contact-reception.component.css']
})
export class MessageContactReceptionComponent implements OnInit {
    public me: String;
    isSingleMode: boolean = true;
    imageAssets = [];
    listMessage: ListView;
    textfield: TextField;
    messageList: Observable<any>;
    imageSrc: any;
    config: Config;
    thumbSize: number = 80;
    previewSize: number = 300;
    idRoom:string;
  nameRoom:string;
    @ViewChild("listView", { static: true }) listView: ElementRef;
    @ViewChild("textField", { static: false }) textField: ElementRef;



    constructor(private page: Page, private routerExtensions: RouterExtensions,private firebaseService: FirebaseService, private ngZone: NgZone,
        private loginService: LoginService,
        private activatedRoute:ActivatedRoute) {
        this.page.actionBarHidden = true;
    }
    public chats$: Observable<any>;
    ngAfterViewInit(): void {
        this.listMessage = this.listView.nativeElement;
        this.textfield = this.textField.nativeElement;
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        
      }
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params) =>{
            console.log(params)
            this.idRoom = params.idRoom;
            this.nameRoom = params.nameRoom;
            this.firebaseService.getChats(this.idRoom).subscribe((response) =>{
              // console.log(response)
              this.messageList = <any> response;
            })
          })
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
    scroll(count: number) {
        console.log("scrolling to ", count)
        this.listMessage.scrollToIndexAnimated(count -1);
        this.listMessage.refresh();
      }
    
      sendMessage(message: string) {
        if (message && message.trim()) {
          this.firebaseService.sendMessage(message,this.idRoom).then((data: any) => {
            let count = this.listMessage.items.length;
            this.scroll(count);
          });
          this.textfield.text = '';
    
        }
    
      }
      filter(sender) {
        let token = getString("username");
        if (token == sender) {
          return "me"
        }
        else {
          return "them"
        }
      }
    
      align(sender) {
        if (sender == getString("username")) {
          return "right"
        }
        else {
          return "left"
        }
      }
      showImage(sender) {
        if (sender == getString("username")) {
          return "collapsed"
        }
        else {
          return "visible"
        }
      }
      checkIdentity(){
        if(this.messageList){
          this.messageList.forEach((item) =>{
            console.log(item)
    
          })
        }
      }
    
    
      accessFolderImage() {
        let that = this;
      
    
        let context = imagepicker.create({
          mode: "single" // use "multiple" for multiple selection
        });
        context
          .authorize()
          .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
          })
          .then((selection) => {
            // console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
              element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
              element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });
            this.uploadImage(that.imageSrc._android)
    
            that.imageAssets = selection;
          }).catch(function (e) {
            console.log(e);
          });
    
      }
      uploadImage(image:string){
        var metadata  = {
          contentType: "demo/test",
          contentLanguage: "fr",
          customMetadata: {
            "foo": "bar",
             "foo2": "bar2"
          }
        };
        firebase.storage.uploadFile({
          bucket:"gs://chat-firebase-6ecdc.appspot.com",
          remoteFullPath:image,
          localFile:fs.File.fromPath(image),
          onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
          },metadata
          
        }).then(
          function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            firebase.storage.getDownloadUrl({
              // optional, can also be passed during init() as 'storageBucket' param so we can cache it
              bucket: "gs://chat-firebase-6ecdc.appspot.com",
              // the full path of an existing file in your Firebase storage
              remoteFullPath: image
            }).then(
                 (url)  =>{
                   this.imageSrc = url;
      
                  console.log("Remote URL: " + url);
                },
                function (error) {
                  console.log("Error: " + error);
                }
            );
          },
          function (error) {
            console.log("File upload error: " + error);
          }
      );
      }
}