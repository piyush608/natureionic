import { CacheProvider } from './../../providers/cache/cache';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { CategoryProvider } from '../../providers/category/category';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  name: 'collection-business-page',
  segment: 'collection-business'
})
@Component({
  selector: 'page-collection-business',
  templateUrl: 'collection-business.html',
})
export class CollectionBusinessPage {
  businesses: Observable<any>;
  filteredBusinesses = 'all';
  tabsElement;
  businessCategory;

  constructor(
    public navCtrl: NavController, 
    private angCache: CacheProvider, 
    private angCategory: CategoryProvider,
    private platform: Platform,
    private angBookmark: BookmarkProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.businesses = this.angCache.bookmarkedBusinesses;

    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ngOnInit() {
    this.angCategory.getBusinessCategories().subscribe(res => {
      this.businessCategory = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.businesses.subscribe(res => {
      if (!res) {
        this.angBookmark.getBookmarkedBusinesses();
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
    this.filteredBusinesses = data;
  }

  prevStep() {
    this.navCtrl.pop();
  }
}