import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { CategoryProvider } from '../../providers/category/category';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  name: 'collection-product-page',
  segment: 'collection-product'
})
@Component({
  selector: 'page-collection-product',
  templateUrl: 'collection-product.html',
})
export class CollectionProductPage {
  products: Observable<any>;
  tabsElement;
  productCategory;
  filteredProducts = 'all';

  constructor(
    public navCtrl: NavController, 
    private angCache: CacheProvider, 
    private platform: Platform,
    private angBookmark: BookmarkProvider,
    private angCategory: CategoryProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.products = this.angCache.bookmarkedProducts;

    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ngOnInit() {
    this.angCategory.getProductCategories().subscribe(res => {
      this.productCategory = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.products.subscribe(res => {
      if (!res) {
        this.angBookmark.getBookmarkProducts();
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
    this.filteredProducts = data;
  }

  prevStep() {
    this.navCtrl.pop();
  }
}