import { LocationProvider } from "./../../providers/location/location";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { FireProvider } from "../../providers/fire/fire";
import { ValuesProvider } from '../../providers/values/values';
import { User } from '../../models/user.model';
import { NotificationProvider } from '../../providers/notifications/notification';
import * as io from 'socket.io-client';
import { BASE_URL } from "../../app/app.url.config";
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "user-page",
  segment: "user"
})
@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage {
  public tabsElement: any;

  public user = new User();
  public recipes: any;
  public products: any;
  public vlogs: any;
  public blogs: any;
  public currentLocation: {
    city: string,
    state: string
  };
  public options: string = "about";
  public userLevel: any;
  public flag: boolean = true;
  
  followText;
  defaultText;
  docId;
  private socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angUser: UserProvider,
    private angLocation: LocationProvider,
    public angFire: FireProvider,
    public angValues: ValuesProvider,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.socket = io(BASE_URL);
  }

  ngOnInit() {
    this.getUserDetails();
  }

  doRefresh(refresher) {
    this.checkFollowStatus();
    
    setTimeout(() => {
      this.getUserDetails();
      refresher.complete();
    }, 3000);
  }

  getUserDetails() {
    this.angUser.getUserProfile(this.navParams.get("uid")).subscribe(res => {
      this.user = res['user'] as User;

      this.angLocation.getLocationFromZipcode(this.user.zipcode.toString()).then(loc => {
        this.currentLocation = loc;
      });
    });

    this.angUser.getRecipes(this.navParams.get("uid")).subscribe(res => {
      this.recipes = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.angUser.getHuntedProducts(this.navParams.get("uid")).subscribe(res => {
      this.products = res;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.storage.get('userData').then(user => {
      this.angUser.getUserFollowers(user._id).subscribe(res => {
        if (res['user'].followings.length > 0) {
          for (var i=0; i<res['user'].followings.length; i++) {
            if (res['user'].followings[i]._id === this.navParams.get("uid")) {
              this.defaultText = 'Unfollow';
              this.followText = 'Unfollow';
              return;
            } else {
              this.defaultText = 'Follow';
              this.followText = 'Follow';
            }
          }
        } else {
          this.defaultText = 'Follow';
          this.followText = 'Follow';
        }
      });
    });
  }

  follow() {
    if (this.followText === 'Follow') this.followText = 'Unfollow';
    else this.followText = 'Follow';
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    this.checkFollowStatus();
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  checkFollowStatus() {
    if (this.followText !== this.defaultText) {
      this.storage.get('userData').then(user => {
        if (this.followText === 'Unfollow') {
          this.angUser.followUser(user._id, this.user._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
          this.sendNotification();
        } else {
          const data = {
            id: this.user._id
          };
          this.angUser.unfollowUser(user._id, data).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      });
    }
  }

  sendNotification() {
    this.storage.get('userData').then(user => {
      const query = {
        itemId: user._id,
        receiver: this.user._id,
        sender: user._id,
        type: 'follow'
      };
      this.angNotification.ifNotificationExists(query).subscribe(res => {
        if (res && res.toString()) {
          console.log('Already exists');
        } else {
          const notification = {
            body: user.name + ' started following you',
            itemId: user._id,
            receiver: this.user._id,
            sender: user._id,
            senderImage: user.photo.thumb400Url,
            page: 'user-page',
            type: 'follow',
            date: new Date()
          };
          this.angNotification.addNotification(notification);
          this.socket.emit('notification', { data: 'Notification Emitted' });
        }
      });
    });
  }

  filter(option) {
    this.options = option;
  }

  prevStep() {
    this.navCtrl.pop();
  }
}