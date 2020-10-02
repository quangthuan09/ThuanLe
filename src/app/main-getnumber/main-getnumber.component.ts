import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Page, EventData, isAndroid, Color, isIOS } from "tns-core-modules/ui/page";
import { Label } from '@nativescript/core/ui/label';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { ContactService } from "../service/contact.service";
import * as utils from "tns-core-modules/utils/utils";
import * as imagepicker from "nativescript-imagepicker";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { ScannerModalComponent } from "../scanner-modal/scanner-modal.component";

declare var android



@Component({
  selector: "MainGetNumber",
  templateUrl: "./main-getnumber.component.html",
  providers: [BarcodeScanner, ContactService],
  styleUrls: ['./main-getnumber.component.css']
})
export class MainGetNumberComponent implements OnInit {
  pause = true;
  guide: any;
  isSingleMode: boolean = true;
  imageAssets = [];
  imageSrc: any;
  thumbSize: number = 80;
  previewSize: number = 300;

  constructor(private page: Page, private routerExtensions: RouterExtensions, private contactService: ContactService,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService) {
    this.page.actionBarHidden = true;

  }

  ngOnInit(): void {
    this.contactService.getContact()
      .subscribe(() => {
        this.guide = this.contactService.guide;
      });

    // console.log("bắt đầu slide");
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

  openVideo1() {
    utils.openUrl(this.guide[0].url);
  }
  openVideo2() {
    utils.openUrl(this.guide[1].url);
  }
  openScanner() {
    let options: ModalDialogOptions = {
      context: {},
      fullscreen: true,
      animated: false,
      viewContainerRef: this.viewContainerRef,
      cancelable: false,
    };
    this.modalService.showModal(ScannerModalComponent, options)
      .then((result: any) => {
      });
  }
  tapDone() {
    let options = {
      title: "Lỗi",
      message: "Chưa có mã đơn hàng",
      okButtonText: "Hủy"
    };
    alert(options);
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