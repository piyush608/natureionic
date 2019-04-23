import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";

@IonicPage({
  name: "business-modal-page",
  segment: "business-modal"
})
@Component({
  selector: "page-business-modal",
  templateUrl: "business-modal.html"
})
export class BusinessModalPage {
  public businessId: any;
  public tabsElement: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, public viewCtrl: ViewController) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  businessPage() {
    this.viewCtrl.dismiss();
  }

  homePage() {
    this.navCtrl.popToRoot();
  }
}
