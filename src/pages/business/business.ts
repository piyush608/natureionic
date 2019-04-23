import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, ToastController, AlertController, Platform } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
import { FireProvider } from "../../providers/fire/fire";
import { LikeProvider } from "../../providers/like/like";
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { BusinessProvider } from '../../providers/business/business';
import { Business } from '../../models/business.model';
import { ValuesProvider } from '../../providers/values/values';
import { UserProvider } from '../../providers/user/user';
import { NotificationProvider } from '../../providers/notifications/notification';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "business-page",
  segment: "business/:businessId"
})
@Component({
  selector: "page-business",
  templateUrl: "business.html"
})
export class BusinessPage {
  @ViewChild(Slides) slides: Slides;
  public business = new Business();
  public businessImages: Observable<any>;
  public tabsElement: any;
  public businessThumb: Observable<any>;
  private isLiked;
  public liked;
  public isBookmarked;
  public bookmarked;
  mapImage;

  businessLikePoints;
  businessDislikePoints;
  userPoints;
  businessCategory: string;

  private appExitSubscriber: Subscription;

  public pageLoadFlag: boolean = true;
  private socket: any;

  constructor(
    private callNumber: CallNumber,
    public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: FireProvider,
    private launchNavigator: LaunchNavigator,
    private angLike: LikeProvider,
    private angBookmark: BookmarkProvider,
    private angBusiness: BusinessProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public angValues: ValuesProvider,
    private alertCtrl: AlertController,
    private angUser: UserProvider,
    private platform: Platform,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    if (this.navParams.get("business")) {
      this.business = this.navParams.get("business");
      this.getAllDetails();
      this.pageLoadFlag = false;
    } else {
      this.getBusinessDetails();
    }

    this.socket = io(BASE_URL);

    this.storage.get('pointSystems').then(res => {
      res.map(data => {
        if (data.query === 'like_business') {
          this.businessLikePoints = data.point;
        } else {
          this.businessLikePoints = 0;
        }

        if (data.query === 'dislike_business') {
          this.businessDislikePoints = data.point;
        } else {
          this.businessDislikePoints = 0;
        }
      });
    });

    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.platform.registerBackButtonAction(() => {
      this.homePage();
    });
    
    this.appExitSubscriber = this.platform.pause.subscribe(res => {
      this.checkLikeAndBookmark();
    });
  }

  ngOnInit() {
    this.socket.on('refreshBusinessLike', (data) => {
      this.angBusiness.getUpdatedLikes(this.business._id).subscribe(res => {
        this.business.likes = res['likes'];
        this.business.likesCollection = res['likesCollection'];
        this.checkIfLiked();
      });
    });
  }

  doRefresh(refresher) {
    this.checkLikeAndBookmark();

    setTimeout(() => {
      this.getBusinessDetails();
      refresher.complete();
    }, 2000);
  }

  getBusinessDetails() {
    if (this.navParams.get("_id")) {
      this.angBusiness.getBusinessDetails(this.navParams.get("_id")).subscribe(data => {
        this.business = data as Business;
        this.getAllDetails();
        this.pageLoadFlag = false;
      }, err => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          title: '404 Error',
          subTitle: "The data you're looking for is already deleted from our server",
          buttons: ['Dismiss']
        });
        alert.present();
      });
    } else {
      this.angBusiness.getBusinessDetails(this.business._id).subscribe(data => {
        this.business = data as Business;
        this.getAllDetails();
      }, err => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          title: '404 Error',
          subTitle: "The data you're looking for is already deleted from our server",
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }
  }

  getAllDetails() {
    this.mapImage = "http://maps.google.com/maps/api/staticmap?center=" + this.business.location._lat + "," + this.business.location._long + "&markers=size:small|" + this.business.location._lat + "," + this.business.location._long + "&zoom=15&size=312x312&key=AIzaSyDgsEC3C4fI6Otn-LJLs2SzySnYp91hHQU";
    this.checkIfLiked();

    this.angUser.bookmarkedBusinessesList.subscribe(res => {
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (this.business._id === res[index]) {
            this.isBookmarked = { id: res[index], flag: true };
            this.bookmarked = true;
            return;
          } else {
            this.isBookmarked = { id: null, flag: false };
            this.bookmarked = false;
          }
        }
      } else {
        this.isBookmarked = { id: null, flag: false };
        this.bookmarked = false;
      }
    });
  }

  checkIfLiked() {
    this.storage.get('userData').then(user => {
      this.angBusiness.getUpdatedLikes(this.business._id).subscribe(res => {
        this.business.likes = res['likes'];
        this.business.likesCollection = res['likesCollection'];
        if (this.business.likesCollection.length > 0) {
          for (var j=0; j<this.business.likesCollection.length; j++) {
            if (this.business.likesCollection[j] === user._id) {
              this.liked = true;
              this.isLiked = { id: this.business.likesCollection[j], flag: true };
              break;
            } else {
              this.isLiked = { id: null, flag: false };
              this.liked = false;
            }
          }
        } else {
          this.isLiked = { id: null, flag: false };
          this.liked = false;
        }
      });
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";

    this.checkLikeAndBookmark();
    this.appExitSubscriber.unsubscribe();
  }

  checkLikeAndBookmark() {
    if (this.liked !== this.isLiked.flag) {
      this.storage.get('userData').then(user => {
        if (this.liked === true) {
          var userSchema = {
            id: user._id
          };

          this.angLike.dislikeBusiness(this.business._id, userSchema).subscribe(res => {
            this.socket.emit('disLikeBusiness', { data: 'Dislike Business Emitted' });
            if (this.business.addedBy && user._id !== this.business.addedBy['_id']) this.angUser.updateUserPoint(this.business.addedBy['_id'], this.businessDislikePoints);
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angLike.likeBusiness(this.business._id, user._id).subscribe(res => {
            this.socket.emit('likeBusiness', { data: 'Like Business Emitted' });
            if (this.business.addedBy && user._id !== this.business.addedBy['_id']) {
              this.angUser.updateUserPoint(this.business.addedBy['_id'], this.businessLikePoints);
              this.socket.emit('updatePoint', { data: 'Point Emitted' });
              this.sendNotification();
            }
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
        itemId: this.business._id,
        receiver: this.business.addedBy['_id'],
        sender: user._id,
        type: 'like'
      };
      this.angNotification.ifNotificationExists(query).subscribe(res => {
        if (res && res.toString()) {
          console.log('Already exists');
        } else {
          const notification = {
            body: user.name + ' liked your business.',
            itemId: this.business._id,
            receiver: this.business.addedBy['_id'],
            sender: user._id,
            senderImage: user.photo.thumb400Url,
            page: 'business-page',
            type: 'like',
            date: new Date()
          };
    
          this.angNotification.addNotification(notification);
          this.socket.emit('notification', { data: 'Notification Emitted' });
        }
      });
    });
  }

  getUserName(id) {
    return this.angValues.getUserName(id);
  }

  call() {
    this.callNumber.callNumber(this.business.phone.toString(), true);
  }

  // Getting direction to business
  getDirection() {
    this.launchNavigator.availableApps().then(data => {
      if (data["google_maps"] === true) {
        let options: LaunchNavigatorOptions = {
          app: this.launchNavigator.APP.GOOGLE_MAPS
        };

        this.launchNavigator.navigate([this.business.location._lat, this.business.location._long], options).then(
          success => console.log("Launched navigator", success),
          error => console.log("Error launching navigator", error)
        );
      } else if (data["apple_maps"] === true) {
        let options: LaunchNavigatorOptions = {
          app: this.launchNavigator.APP.APPLE_MAPS
        };

        this.launchNavigator.navigate([this.business.location._lat, this.business.location._long], options).then(
          success => console.log("Launched navigator", success),
          error => console.log("Error launching navigator", error)
        );
      }
    });
  }

  openSlider(key) {
    this.slides.slideTo(key, 500);
  }

  openImage(i) {
    let imagesModal = this.modalCtrl.create('images-page', { index: i, images: this.business.photos });
    imagesModal.present();
  }

  homePage() {
    this.navCtrl.pop();
  }

  like() {
    if (this.isLiked.flag === true) {
      this.business.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.business.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
    }
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var businessSchema = {
          _id: this.isBookmarked.id,
          businessId: this.business._id
        };

        this.angBookmark.debookmarkBusiness(user._id, businessSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkBusiness(this.business._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  openCategory() {
    this.navCtrl.push('explore-business-category-page', { '_id': this.business.category['_id'] });
  }
}