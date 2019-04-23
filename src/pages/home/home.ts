import { NavController, IonicPage, Platform } from "ionic-angular";
import { LocationProvider } from "./../../providers/location/location";
import { ArticlesProvider } from "../../providers/articles/articles";
import { CategoryProvider } from '../../providers/category/category';
import { LevelsProvider } from "../../providers/levels/levels";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HomeProvider } from "./../../providers/home/home";
import { FireProvider } from "../../providers/fire/fire";
import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";
import { Component, OnInit } from "@angular/core";
import { BASE_URL } from "../../app/app.url.config";
import { Storage } from "@ionic/storage";
import * as io from 'socket.io-client';

@IonicPage({
  segment: "home",
  name: "home-page"
})
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  // All variables
  public socket: any;
  public businessCategory: any;
  
  public categoryScrollHeight: string;
  public businessScrollHeight: string;
  public recipeScrollHeight: string;
  public productScrollHeight: string;
  public factsScrollHeight: string;
  public guideScrollHeight: string;
  public factCardId: string;
  public userPoint: number;
  public currentLocation: {
    city: string,
    state: string
  };

  // All arrays
  public following = [];
  
  // Two way bind data
  public guides: any;
  public userLevel: any;
  public businesses: any;
  public recipes: any;
  public products: any;
  public articlesCategories: any;
  public articles: any;
  public cards: any;

  // Flags variables for spinner
  public flag: boolean = true;
  public guideFlag: boolean = false;
  public businessFlag: boolean = false;
  public recipeFlag: boolean = false;
  public productFlag: boolean = false;

  constructor(
    public navCtrl: NavController,
    public angFire: FireProvider,
    public angAuth: AuthProvider,
    public location: LocationProvider,
    private angHome: HomeProvider,
    private angLocation: LocationProvider,
    private platform: Platform,
    private angUser: UserProvider,
    private angLevels: LevelsProvider,
    private angArticles: ArticlesProvider,
    private iab: InAppBrowser,
    private angCategory: CategoryProvider,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is("tablet") === true) {
        if (this.platform.isLandscape() === true) {
          this.businessScrollHeight = "330px";
          this.categoryScrollHeight = "160px";
          this.recipeScrollHeight = "370px";
          this.productScrollHeight = "350px";
          this.guideScrollHeight = (this.platform.height() / 1.35).toString() + "px";
          this.factsScrollHeight = (this.platform.height() / 3.01).toString() + "px";
        } else { }
      } else {
        this.businessScrollHeight = (this.platform.height() / 2.79).toString() + "px";
        this.categoryScrollHeight = (this.platform.height() / 5).toString() + "px";
        this.recipeScrollHeight = (this.platform.height() / 2.35).toString() + "px";
        this.productScrollHeight = (this.platform.height() / 2.6).toString() + "px";
        this.guideScrollHeight = (this.platform.height() / 2.25).toString() + "px";
        this.factsScrollHeight = (this.platform.height() / 3.01).toString() + "px";
      }
    });

    this.socket = io(BASE_URL);
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);

    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  ngOnInit() {
    this.getCurrentLocation();
    this.getUserPoints();
    this.getFactCards();
    this.getFollowerPost();

    this.angCategory.getBusinessCategories().subscribe(res => {
      this.businessCategory = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.angHome.getGuides().subscribe(data => {
      this.guides = data;
    }, err => {
      console.log(JSON.stringify(err));
    });

    // Get top 8 recipes
    this.angHome.getMostLikedRecipes().subscribe(res => {
      this.recipes = res;
    });

    // Get top 4 hunted products
    this.angHome.getMostLikedProducts().subscribe(res => {
      this.products = res;
    });

    // Get article categories
    this.angArticles.getArticleCategories().subscribe(res => {
      this.articlesCategories = res;
    });

    // Get articles
    this.angArticles.getArticles().subscribe(res => {
      this.articles = res;
    });

    if (this.flag === true) {
      setInterval(() => {
        if (this.businesses && this.recipes && this.products && this.guides && this.articles) this.flag = false;
      }, 1500);
    }

    this.socket.on('userPoint', (data) => {
      this.getUserPoints();
    });
  }

  getUserPoints() {
    this.angUser.getPoints().subscribe(res => {
      this.userPoint = res['points'].points ? res['points'].points : 0;
      let points = res['points'].points === 0 ? 1 : res['points'].points;
      this.angLevels.getUserLevel(points).subscribe(data => {
        this.userLevel = data;
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }

  getFollowerPost() {
    // this.nativeStorage.getItem('user').then(data => {
    //   this.angUser.getFollowings(data.uid).subscribe(res => {
    //     res.map(r => {
    //       this.angUser.getUserDetailsById(r['userId']).subscribe(success => {
    //         if (success.latestPost && success.latestPost.date) {
    //           let endDate = new Date();
  
    //           if ((endDate.getTime() - success.latestPost.date.toMillis())/(1000*60*60*24) <= 7) {
    //             this.following.push(success);
    //           }
    //         } 
    //       });
    //     });
    //   });
    // });
  }

  getFactCards() {
    this.angUser.getUserRegistrationDate().subscribe(res => {
      // var firstDate = new Date(res['registeredDate'].registeredDate);
      // var secondDate = new Date();
  
      // var timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
      // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
      // this.factCardId = "week" + (parseInt((diffDays / 7).toString()) + 1);
      // this.angHome.getFactCards(this.factCardId).subscribe(res => {
      //   this.cards = res;
      // });
    });
  }

  getCurrentLocation() {
    this.storage.get('location').then(loc => {
      this.angLocation.getLocation(parseFloat(loc._lat), parseFloat(loc._long)).then(data => {
        this.currentLocation = data;
        this.getLocalBusinesses(this.currentLocation.city);
      });
    }).catch(() => {
      this.angUser.getUserZipcode().subscribe(res => {
        this.angLocation.getLocationFromZipcode(res['zipcode'].zipcode).then(loc => {
          this.currentLocation = loc;
          this.getLocalBusinesses(this.currentLocation.city);
        });
      })
    });
  }

  getLocalBusinesses(city) {
    this.angHome.getMostLikedBusinesses(city).subscribe(res => {
      this.businesses = res;
    });
  }

  showGuide(link) {
    const browser = this.iab.create(link);
    browser.show();
  }

  chooseOptions() {
    this.navCtrl.push("options-page");
  }

  searchPage() {
    this.navCtrl.push("search-page");
  }

  exploreAllBusinesses() {
    this.navCtrl.push('explore-business-page', { 'city': this.currentLocation.city });
  }

  exploreAllProducts() {
    this.navCtrl.push("explore-products-page", { products: this.products });
  }

  exploreAllRecipes() {
    this.navCtrl.push("explore-recipe-page", { recipes: this.recipes });
  }

  openCategory(key) {
    this.navCtrl.push("explore-business-category-page", { _id: key });
  }

  changeLocation() {
    this.navCtrl.push("location-page");
  }

  addBusiness() {
    this.navCtrl.push("add-business-page");
  }

  openArticleCat(item) {
    this.navCtrl.push('explore-articles-page', { item: item });
  }

  openPoints() {
    this.navCtrl.push('points-page');
  }
}