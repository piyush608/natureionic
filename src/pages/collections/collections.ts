import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage({
  name: "collections-page",
  segment: "collections"
})
@Component({
  selector: "page-collections",
  templateUrl: "collections.html"
})
export class CollectionsPage {

  constructor(public navCtrl: NavController) {
  }

  openCollectionBusiness() {
    this.navCtrl.push('collection-business-page');
  }

  openCollectionRecipe() {
    this.navCtrl.push('collection-recipe-page');
  }

  openCollectionProducts() {
    this.navCtrl.push('collection-product-page');
  }

  openCollectionInspiration() {
    this.navCtrl.push('collection-article-page');
  }

  swipe(event) {
    if(event.direction === 2) {
      this.navCtrl.parent.select(3);
    }
    if(event.direction === 4) {
      this.navCtrl.parent.select(1);
    }
  }
}
