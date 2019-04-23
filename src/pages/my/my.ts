import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { LevelsProvider } from '../../providers/levels/levels';
import { User } from '../../models/user.model';
import { LocationProvider } from '../../providers/location/location';
import { UserProvider } from '../../providers/user/user';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "my-page",
  segment: "my"
})
@Component({
  selector: "page-my",
  templateUrl: "my.html"
})
export class MyPage implements OnInit {
  // All variables
  public tabsElement: any;
  public options: string;
  public currentLocation: {
    city: string,
    state: string
  };
  public recipes: any;
  public products: any;
  public blogs: any;
  public vlogs: any;
  public userLevel: any;
  public userPoint: any;

  // Two-way binding variables
  public user = new User();

  // Boolean variables
  public flag: boolean = true;

  constructor(
    public navCtrl: NavController,
    private angLevels: LevelsProvider,
    private angLocation: LocationProvider,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.options = "about";
  }

  doRefresh(refresher) {
    this.getUserDetails();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ngOnInit() {
    this.getUserDetails();
  }

  filter(option) {
    this.options = option;
  }

  getUserDetails() {
    this.storage.get('userData').then(user => {
      this.user = user;
      this.angLocation.getLocationFromZipcode(user.zipcode.toString()).then(loc => {
        this.currentLocation = loc;
      });

      this.angUser.getRecipes(user._id).subscribe(res => {
        this.recipes = res;
      }, err => {
        console.log(JSON.stringify(err));
      });

      this.angUser.getHuntedProducts(user._id).subscribe(res => {
        this.products = res;
      }, err => {
        console.log(JSON.stringify(err));
      });

      this.angUser.getUserPoints(user._id).subscribe(res => {
        this.userPoint = res['points'].points;
        let points = res['points'].points === 0 ? 1 : res['points'].points;
        this.angLevels.getUserLevel(points).subscribe(data => {
          this.userLevel = data;
          this.flag = false;
        }, err => {
          console.log(JSON.stringify(err));
        });
      });
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  prevStep() {
    this.navCtrl.pop();
  }

  addRecipe() {
    this.navCtrl.push('add-recipe-page');
  }

  addProduct() {
    this.navCtrl.push('add-product-page');
  }

  addBlog() {
    this.navCtrl.push('add-blog-page');
  }

  addVlog() {
    this.navCtrl.push('add-video-page');
  }

  openPoints() {
    this.navCtrl.push('points-page');
  }
}