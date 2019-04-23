import { HomePage } from './../home/home';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CategoryProvider } from '../../providers/category/category';

@IonicPage({
  name: "explore-business-page",
  segment: "explore-business"
})
@Component({
  selector: "page-explore-business",
  templateUrl: "explore-business.html"
})
export class ExploreBusinessPage {
  public city: string;
  public businessCategories;
  private tabsElement: any;
  public flag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angCategory: CategoryProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");    

    this.city = this.navParams.get('city');

    this.angCategory.getBusinessCategories().subscribe(res => {
      this.businessCategories = res;
      this.flag = false;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  doRefresh(refresher) {
    this.angCategory.getBusinessCategories().subscribe(res => {
      this.businessCategories = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  openMap() {
    this.navCtrl.push('result-business-map-page', { location: this.city });
  }

  prevStep() {
    if(this.navCtrl.canGoBack()) this.navCtrl.pop();
    else this.navCtrl.setRoot(HomePage);
  }

  searchPage() {
    this.navCtrl.push('search-page');
  }
}