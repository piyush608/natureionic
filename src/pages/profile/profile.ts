import { Observable } from "rxjs/Observable";
import { FireProvider } from "./../../providers/fire/fire";
import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { LocationProvider } from "./../../providers/location/location";
import { AuthProvider } from "../../providers/auth/auth";
import { UserProvider } from "../../providers/user/user";
import { ModalController } from "ionic-angular";
import { NotificationProvider } from "../../providers/notifications/notification";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Storage } from "@ionic/storage";
import { LevelsProvider } from "../../providers/levels/levels";
import { User } from "../../models/user.model";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage({
  name: "profile-page",
  segment: "profile"
})
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage implements OnInit {
  public emailIsVerified: boolean;
  public user = new User();
  public userLocation: Observable<any>;
  public currentUser: any;
  public verified: boolean;
  public notifications: Observable<any>;
  public referCode: string;

  public likes = {};
  public uid;
  public added;
  public count;
  public comments;
  public levels;
  public currentLocation: {
    city: string;
    state: string;
  };
  public recipes: any;
  public products: any;
  public blogs: any;
  public vlogs: any;
  public userLevel: any;
  public userPoint: any;
  public options: string = "about";
  public followers: any;
  public followersCount: number;
  public followingsCount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angAuth: AuthProvider,
    public angFire: FireProvider,
    public alertCtrl: AlertController,
    public angLocation: LocationProvider,
    private angUser: UserProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public angNotifications: NotificationProvider,
    private socialSharing: SocialSharing,
    private storage: Storage,
    private angLevels: LevelsProvider,
    private iab: InAppBrowser
  ) {}

  ionViewWillEnter() {
    this.getUserData();
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.storage.get("userData").then(user => {
      this.user = user;

      this.angLocation
        .getLocationFromZipcode(user.zipcode.toString())
        .then(loc => {
          this.currentLocation = loc;
        });

      this.angUser.getUserPoints(user._id).subscribe(res => {
        this.userPoint = res["points"].points;
        this.angLevels.getUserLevel(res["points"].points).subscribe(
          data => {
            this.userLevel = data;
          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
      });
    });
  }

  editProfile() {
    this.navCtrl.push("edit-profile-page");
  }

  editAccount() {
    this.navCtrl.push("account-page");
  }

  openMyPage() {
    this.navCtrl.push("my-page");
  }

  showNotification() {
    this.navCtrl.push("notification-page");
  }

  openFeedback() {
    this.navCtrl.push("feedback-page");
  }

  openFollowing() {
    this.navCtrl.push("following-page");
  }

  openPoints() {
    this.navCtrl.push("points-page");
  }

  openPrivacy() {
    const link = 'https://naturehub.com/privacy-policies.html';
    const browser = this.iab.create(link);
    browser.show();
  }

  logout() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    const confirm = this.alertCtrl.create({
      title: "Are you sure?",
      buttons: [
        {
          text: "Cancel",
          handler: () => {
            confirm.dismiss();
          }
        },
        {
          text: "Sign Out",
          handler: () => {
            loading.present();
            confirm.dismiss();
            this.angAuth.signout();
            this.storage.remove("userData");
            loading.dismiss();
            this.navCtrl.setRoot("login-page");
          }
        }
      ]
    });
    confirm.present();
  }
}
