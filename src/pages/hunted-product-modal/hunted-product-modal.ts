import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';

@IonicPage({
  name:'hunted-product-modal-page',
  segment:'hunted-product-modal'
})
@Component({
  selector: 'page-hunted-product-modal',
  templateUrl: 'hunted-product-modal.html',
})
export class HuntedProductModalPage {

  public productId: any;
  public tabsElement: any;

  constructor(public navCtrl: NavController,public navParams: NavParams, public viewCtrl: ViewController) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  productPage() {
    this.viewCtrl.dismiss();
  }

  homePage() {
    this.navCtrl.popToRoot();
  }

}
