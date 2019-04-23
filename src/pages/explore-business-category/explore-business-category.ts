import { LocationProvider } from './../../providers/location/location';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { BusinessProvider } from "../../providers/business/business";
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "explore-business-category-page",
  segment: "explore-business-category"
})
@Component({
  selector: "page-explore-business-category",
  templateUrl: "explore-business-category.html"
})
export class ExploreBusinessCategoryPage {
  // All variables
  public businessCategory: string;
  public tabsElement: any;
  public businesses: any;
  public businessScrollHeight: any;

  // Boolean variables
  public flag: boolean = true;
  public emptyFlag: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private angBusiness: BusinessProvider, 
    private angLocation: LocationProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  ngOnInit() {
    this.storage.get('location').then(res => {
      this.angLocation.getLocation(parseFloat(res._lat), parseFloat(res._long)).then(data => {
        this.angBusiness.getCategoryBusinesses(this.navParams.get("_id"), data.city).subscribe(res => {
          this.businesses = res;
          this.flag = false;
        }, err => {
          console.log(JSON.stringify(err));
        });
      });
    }).catch(() => {
      this.storage.get('userLocation').then(res => {
        this.angBusiness.getCategoryBusinesses(this.navParams.get("_id"), res.placeName).subscribe(data => {
          this.businesses = data;
          this.flag = false;
        }, err => {
          console.log(JSON.stringify(err));
        });
      });
    });
  }

  prevStep() {
    this.navCtrl.pop();
  }

  addBusiness() {
    this.navCtrl.push('add-business-page');
  }
}