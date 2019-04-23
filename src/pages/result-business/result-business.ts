import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage({
  name: "result-business-page",
  segment: "result-business"
})
@Component({
  selector: "page-result-business",
  templateUrl: "result-business.html"
})
export class ResultBusinessPage {
  public tabsElement: any;
  public business;
  public searchQuery;

  public healthCare = [];
  public bathAndBeauty = [];
  public restaurants = [];
  public cafe = [];
  public grocery = [];
  public farmer = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.business = this.navParams.get("business");
    this.searchQuery = this.navParams.get('query');
    this.getResults();
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  getResults() {
    this.business.map(bus => {
      if(bus.category === 'healthCare') this.healthCare.push(bus);
      else if(bus.category === 'bathAndBeauty') this.bathAndBeauty.push(bus);
      else if(bus.category === 'restaurants') this.restaurants.push(bus);
      else if(bus.category === 'farmer') this.farmer.push(bus);
      else if(bus.category === 'cafe') this.cafe.push(bus);
      else if(bus.category === 'grocery') this.grocery.push(bus);
    });
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  searchPage() {
    this.navCtrl.push('search-page');
  }

  homePage() {
    if(this.navCtrl.canGoBack()) this.navCtrl.pop();
    else this.navCtrl.setRoot('result-page', { query: this.searchQuery });
  }
}