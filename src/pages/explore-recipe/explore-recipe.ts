import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { RecipeProvider } from "../../providers/recipe/recipe";
import { CategoryProvider } from '../../providers/category/category';

@IonicPage({
  name: "explore-recipe-page",
  segment: "explore-recipe"
})
@Component({
  selector: "page-explore-recipe",
  templateUrl: "explore-recipe.html"
})
export class ExploreRecipePage {
  public recipe = [];
  public tabsElement;
  public recipeCategory;
  public filteredRecipes = 'all';
  public count = 1;
  public moreRecipeFlag: boolean = true;
  public flag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angRecipe: RecipeProvider,
    private angCategory: CategoryProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.angCategory.getRecipeCategories().subscribe(res => {
      this.recipeCategory = res;
      this.recipe = this.navParams.get('recipes');
      this.flag = false;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  doRefresh(refresher) {
    this.refreshPage();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
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

  prevStep() {
    this.navCtrl.pop();
  }

  moreRecipe(event) {
    this.angRecipe.getNextMostLikedRecipes(this.count * 8).subscribe(res => {
      if (res.toString()) {
        this.recipe = this.recipe.concat(res);
        event.complete();
        this.count++;
      } else {
        this.moreRecipeFlag = false;
      }
    }, err => {
      this.moreRecipeFlag = false;
    });
  }

  refreshPage() {
    this.count = 0;
    this.angRecipe.getNextMostLikedRecipes(this.count * 8).subscribe(res => {
      if (res.toString()) {
        this.recipe = res as any[];
        this.count++;
      } else {
        this.moreRecipeFlag = false;
      }
    }, err => {
      this.moreRecipeFlag = false;
    });
  }
}