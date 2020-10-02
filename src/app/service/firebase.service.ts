import { Injectable, NgZone, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { share } from 'rxjs/operators';
import { getString } from 'tns-core-modules/application-settings';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { LoginService } from './login.service';

const firebase = require("nativescript-plugin-firebase");





@Injectable()
export class FirebaseService implements OnInit {

  private _messageList = [];
  contactList: any;


  constructor(private ngZone: NgZone, private loginService: LoginService) {

  }
  ngOnInit(): void {
    // this.contactList = this.webApiService.mainData["contact_list"];

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  public get messageList(): any {
    return this._messageList;
  }
  public set messageList(value: any) {
    this._messageList = value;
  }


  getChats(idRoom: any) {
    let path = "/Message/" + idRoom;
    return new Observable((observer: any) => {
      let path = "/Message/" + idRoom;

      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          let results = this.handleChatSnapshot(snapshot.value);
          observer.next(results);
        });
      };
      firebase.addValueEventListener(onValueEvent, path)
      .then((response) =>{

      });
    }).pipe(share());
  }

  handleChatSnapshot(data: any) {
    this.messageList = new ObservableArray();
    if (data) {
      for (let id in data) {
        // let result = (<any>Object).assign({ id: id }, data[id]);
        this.messageList.push(data[id]);
      }
      this.publishChatUpdates();
    }
    return this.messageList;

  }

  publishChatUpdates() {
    this.messageList.sort(function (a, b) {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    })
  }

  S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  sendMessage(message: string, idRoom: any) {
    //let chat = Chat; 
    var messageId = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();

    return firebase.push(
      "/Message/" + idRoom,
      { id: messageId, message, user: { userId: "2", avatar: "", userName: getString("username"), }, "date": 0 - Date.now() }
    ).then(() => {
      return "chatted";

    })
  }

  addRoomChat() {
    var idRoom = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();

    return firebase.push(
      "/ChatRoom" + idRoom,
      {
        "idRoom": idRoom,
        // "nameRoom": this.webApiService.mainData.contact_list.fullname,
        "userId": this.loginService.user.manv,
        "date": 0 - Date.now()
      }).then(() => {
        return "chatList";

      })
  }




}