import { CacheProvider } from './../../providers/cache/cache';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { CategoryProvider } from '../../providers/category/category';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  name: 'collection-recipe-page',
  segment: 'collection-recipe'
})
@Component({
  selector: 'page-collection-recipe',
  templateUrl: 'collection-recipe.html',
})
export class CollectionRecipePage {
  recipes: Observable<any>;
  tabsElement;
  recipeCategory;
  filteredRecipes = 'all';

  constructor(
    public navCtrl: NavController, 
    private angCache: CacheProvider, 
    private platform: Platform,
    private angBookmark: BookmarkProvider,
    private angCategory: CategoryProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.recipes = this.angCache.bookmarkedRecipes;

    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ngOnInit() {
    this.angCategory.getRecipeCategories().subscribe(res => {
      this.recipeCategory = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.recipes.subscribe(res => {
      if (!res) {
        this.angBookmark.getBookmarkedRecipes();
      }
    });
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
}