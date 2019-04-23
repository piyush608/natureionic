import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ValuesProvider } from "../../providers/values/values";

@IonicPage({
  name: "result-recipe-page",
  segment: "result-recipe"
})
@Component({
  selector: "page-result-recipe",
  templateUrl: "result-recipe.html"
})
export class ResultRecipePage {
  public tabsElement: any;
  public recipe;
  recipeCategory;
  public searchQuery;
  filteredRecipes = 'all';

  constructor(public navCtrl: NavController, public navParams: NavParams, private angValues: ValuesProvider) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.recipe = this.navParams.get("recipe");
    this.searchQuery = this.navParams.get("query");
    this.recipeCategory = this.angValues.recipeCategory;
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  filter(data) {
    this.filteredRecipes = data;
  }

  searchPage() {
    this.navCtrl.push('search-page');
  }

  homePage() {
    this.navCtrl.pop();
  }
}
