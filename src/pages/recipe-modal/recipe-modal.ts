import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController,} from "ionic-angular";

@IonicPage({
  name: "recipe-modal-page",
  segment: "recipe-modal"
})
@Component({
  selector: "page-recipe-modal",
  templateUrl: "recipe-modal.html"
})
export class RecipeModalPage {
  public recipeId: any;
  public tabsElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  recipePage() {
    this.viewCtrl.dismiss();
  }

  homePage() {
    this.navCtrl.popToRoot();
  }
}
