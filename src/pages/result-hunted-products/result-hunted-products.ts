import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ValuesProvider } from "../../providers/values/values";

@IonicPage({
  name:'result-hunted-products-page',
  segment:'result-hunted-products'
})
@Component({
  selector: 'page-result-hunted-products',
  templateUrl: 'result-hunted-products.html',
})
export class ResultHuntedProductsPage {
  public tabsElement: any;
  public product;
  productCategory;
  public searchQuery;
  filteredProducts = 'all';
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private angValues: ValuesProvider) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.product = this.navParams.get("product");
    this.searchQuery = this.navParams.get("query");
    this.productCategory = this.angValues.productCategory;
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  filter(data) {
    this.filteredProducts = data;
  }
  
  searchPage() {
    this.navCtrl.push('search-page');
  }

  homePage() {
    this.navCtrl.pop();
  }
}
