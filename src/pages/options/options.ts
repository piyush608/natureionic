import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Content, Platform } from "ionic-angular";

@IonicPage({
  name: "options-page",
  segment: "options"
})
@Component({
  selector: "page-options",
  templateUrl: "options.html"
})
export class OptionsPage {
  public tabsElement: any;
  @ViewChild(Content)
  content: Content;
  @ViewChild("scroll")
  scroll: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
    let yOffset =
      document.getElementById("middleCard").offsetTop -
      Math.round((this.content.contentHeight * 26) / 100);
    this.scroll._scrollContent.nativeElement.scrollTop = yOffset;

    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  // Redirect to add business page
  addBusiness() {
    this.navCtrl.push("add-business-page");
  }

  // Redirect to add recipe page
  addReciepe() {
    this.navCtrl.push("add-recipe-page");
  }

  // Redirect to add recipe page
  addProducts() {
    this.navCtrl.push("add-product-page");
  }

  prevStep() {
    this.navCtrl.pop();
  }
}
