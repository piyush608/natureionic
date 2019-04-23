import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { Observable } from 'rxjs/Observable';

@IonicPage({
  name: 'collection-article-page',
  segment: 'collection-article'
})
@Component({
  selector: 'page-collection-article',
  templateUrl: 'collection-article.html',
})
export class CollectionArticlePage {
  articles: Observable<any>;
  factCards;
  tabsElement;

  constructor(
    public navCtrl: NavController, 
    private angCache: CacheProvider,
    private platform: Platform,
    private angBookmark: BookmarkProvider
  ) {
    this.articles = this.angCache.bookmarkedArticles;
    this.factCards = angCache.bookmarkedFactCards;
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ngOnInit() {
    this.articles.subscribe(res => {
      if (!res) {
        this.angBookmark.getBookmarkArticles();
      }
    });
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  prevStep() {
    this.navCtrl.pop();
  }
}