import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { EventData, Page } from 'tns-core-modules/ui/page';
import {
  MLKitScanBarcodesOnDeviceResult,
  MLKitScanBarcodesResultBarcode
} from "nativescript-plugin-firebase/mlkit/barcodescanning";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import * as permissions from 'nativescript-permissions';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);
declare var android
@Component({
  selector: "scannermodal",
  moduleId: module.id,
  templateUrl: "./scanner-modal.component.html",
  styleUrls: ["./scanner-modal.component.css"],

})

export class ScannerModalComponent {
  barcodes: Array<MLKitScanBarcodesResultBarcode>;

  pause: boolean = false;
  torchOn: boolean;

  constructor(private page: Page, private routerExtensions: RouterExtensions, private params: ModalDialogParams) {
    page.actionBarHidden = true;
    this.torchOn = false;
  }

  toggleTorch(args: EventData) {
    const sw = <Switch>args.object;
    if (sw.checked != this.torchOn) {
      this.torchOn = sw.checked;
    }
  }

  onBarcodeScanResult(event: any): void {
    const result = event.value;
    if (result.barcodes.length > 0) {
      this.barcodes = result.barcodes;

    }

    if (this.barcodes.length > 0) {
      // console.log("this.barcodes: " + JSON.stringify(this.barcodes));
    }
  }
  goBack() {
    this.routerExtensions.back();
  }
  onScannerLoad() {

  }
  isGranted() {
    const permission = permissions.hasPermission(android.Manifest.permission.CAMERA);

    if (permission) {
      return true;
    } else {
      return false;
    }
  }

  public close() {

    this.params.closeCallback(this.barcodes);
  }

  closeModal() {
    this.params.closeCallback();

  }



}