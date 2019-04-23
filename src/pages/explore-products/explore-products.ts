import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HuntedProductProvider } from '../../providers/hunted-product/hunted-product';
import { CategoryProvider } from '../../providers/category/category';

@IonicPage({
  name:'explore-products-page',
  segment:'explore-product'
})
@Component({
  selector: 'page-explore-products',
  templateUrl: 'explore-products.html',
})
export class ExploreProductsPage {
  public product = [];
  public tabsElement: any;
  public productCategory;
  public filteredProducts = 'all';
  public count = 1;
  public pageLoad: boolean = true;
  public flag: boolean = false;
  public moreProductFlag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angProducts: HuntedProductProvider,
    private angCategory: CategoryProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  doRefresh(refresher) {
    this.refreshPage();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ngOnInit() {
    this.angCategory.getProductCategories().subscribe(res => {
      this.productCategory = res;
      this.product = this.navParams.get('products');
      this.pageLoad = false;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.angProducts.getNextMostLikedHuntedProducts(this.count * 4).subscribe(res => {
      if (res.toString()) {
        this.product = this.product.concat(res);
        this.count++;
        this.flag = true;
      } else {
        this.flag = true;
        this.moreProductFlag = false;
      }
    }, err => {
      this.flag = true;
      this.moreProductFlag = false;
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

  moreProducts(event) {
    this.angProducts.getNextMostLikedHuntedProducts(this.count * 4).subscribe(res => {
      if (res.toString()) {
        this.product = this.product.concat(res);
        event.complete();
        this.count++;
      } else {
        this.moreProductFlag = false;
        event.complete();
      }
    }, err => {
      this.moreProductFlag = false;
    });
  }

  refreshPage() {
    this.count = 0;
    this.angProducts.getNextMostLikedHuntedProducts(this.count * 4).subscribe(res => {
      if (res.toString()) {
        this.product = this.product.concat(res);
        this.count++;
      } else {
        this.moreProductFlag = false;
      }
    }, err => {
      this.moreProductFlag = false;
    });
  }
}