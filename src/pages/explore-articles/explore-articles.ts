import { ArticlesProvider } from './../../providers/articles/articles';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  segment: 'explore-articles',
  name: 'explore-articles-page'
})
@Component({
  selector: 'page-explore-articles',
  templateUrl: 'explore-articles.html',
})
export class ExploreArticlesPage {
  public articleCat: any;
  public articles;
  private tabsElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angArticles: ArticlesProvider) {
    this.articleCat = this.navParams.get('item');
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }
  
  ngOnInit() {
    this.angArticles.getArticlesOredrByCat(this.articleCat._id).subscribe(res => {
      this.articles = res;
    }, err => {
      console.log(JSON.stringify(err));
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