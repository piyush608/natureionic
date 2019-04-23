import { Product } from './../../models/product.model';
import { BookmarkProvider } from './../../providers/bookmark/bookmark';
import { ValuesProvider } from './../../providers/values/values';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, ToastController, AlertController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { HuntedProductProvider } from '../../providers/hunted-product/hunted-product'
import { LikeProvider } from '../../providers/like/like';
import { LocationProvider } from '../../providers/location/location';
import { UserProvider } from '../../providers/user/user';
import { NotificationProvider } from '../../providers/notifications/notification';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'hunted-products-page',
  segment: 'hunted-produts'
})
@Component({
  selector: 'page-hunted-products',
  templateUrl: 'hunted-products.html',
})
export class HuntedProductsPage {
  @ViewChild(Slides) slides: Slides;
  public product = new Product();
  isLiked;
  isBookmarked;
  liked;
  bookmarked;
  productLikePoints;
  productDislikePoints;
  userPoints;
  tabsElement: any;
  count = 0;
  loc: string;
  username: string;
  currentLocation: {
    city: string,
    state: string
  };

  public huntedProductCat: any;
  public huntedProductSubcat: any;
  public authorImage: any;
  public postedBy: any;
  public postedFrom: any;

  private appExitSubscriber: Subscription;
  public pageLoadFlag: boolean = true;
  private socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angHuntedProduct: HuntedProductProvider,
    private angLike: LikeProvider,
    private angValues: ValuesProvider,
    private angBookmark: BookmarkProvider,
    private angLocation: LocationProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private angUser: UserProvider,
    private platform: Platform,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    if (this.navParams.get("product")) {
      this.product = this.navParams.get("product");
      this.loadAllDetails();
      this.pageLoadFlag = false;
    } else {
      this.getProductDetails();
    }

    this.socket = io(BASE_URL);

    this.storage.get('pointSystems').then(res => {
      res.map(data => {
        if (data.query === 'like_product') {
          this.productLikePoints = data.point;
        } else {
          this.productLikePoints = 0;
        }

        if (data.query === 'dislike_product') {
          this.productDislikePoints = data.point;
        } else {
          this.productDislikePoints = 0;
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
    this.socket.on('refreshHuntedProductLike', (data) => {
      this.angHuntedProduct.getUpdatedLikes(this.product._id).subscribe(res => {
        this.product.likes = res['likes'];
        this.product.likesCollection = res['likesCollection'];
        this.checkIfLiked();
      });
    });
  }

  doRefresh(refresher) {
    this.checkLikeAndBookmark();

    setTimeout(() => {
      this.getProductDetails();
      refresher.complete();
    }, 2000);
  }

  getProductDetails() {
    if (this.navParams.get("_id")) {
      this.angHuntedProduct.getProductDetails(this.navParams.get("_id")).subscribe(data => {
        this.product = data as Product;
        this.loadAllDetails();
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
      this.angHuntedProduct.getProductDetails(this.product._id).subscribe(data => {
        this.product = data as Product;
        this.loadAllDetails();
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

  loadAllDetails() {
    if (this.product.category) {
      this.angHuntedProduct.getProductCategory(this.product.category['_id']).subscribe(res => {
        res['subCategories'].map(subcat => {
          if (subcat._id === this.product.subCategory) {
            this.huntedProductSubcat = subcat.name;
            return;
          }
        });
      });
    }

    if (this.product.addedBy) {
      this.angLocation.getLocationFromZipcode(this.product.addedBy['zipcode'].toString()).then(loc => {
        this.currentLocation = loc;
      });
    }
    this.checkIfLiked();

    this.angUser.bookmarkedhubtedProductsList.subscribe(res => {
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (this.product._id === res[index]) {
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
      this.angHuntedProduct.getUpdatedLikes(this.product._id).subscribe(res => {
        this.product.likes = res['likes'];
        this.product.likesCollection = res['likesCollection'];
        if (this.product.likesCollection && this.product.likesCollection.length > 0) {
          for (var j=0; j<this.product.likesCollection.length; j++) {
            if (this.product.likesCollection[j] === user._id) {
              this.liked = true;
              this.isLiked = { id: this.product.likesCollection, flag: true };
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
    this.storage.get('userData').then(user => {
      if (this.liked !== this.isLiked.flag) {
        if (this.liked === true) {
          var userSchema = {
            id: user._id
          };

          this.angLike.dislikeHuntedProduct(this.product._id, userSchema).subscribe(res => {
            this.socket.emit('disLikeHuntedProduct', { data: 'Dislike Hunted Product Emitted' });
            if (this.product.addedBy && user._id !== this.product.addedBy['_id']) this.angUser.updateUserPoint(this.product.addedBy['_id'], this.productDislikePoints);
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angLike.likeHuntedProduct(this.product._id, user._id).subscribe(res => {
            this.socket.emit('likeHuntedProduct', { data: 'Like Hunted Product Emitted' });
            if (this.product.addedBy && user._id !== this.product.addedBy['_id']) {
              this.angUser.updateUserPoint(this.product.addedBy['_id'], this.productLikePoints);
              this.socket.emit('updatePoint', { data: 'Point Emitted' });
              this.sendNotification();
            }
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      }
    });
  }

  sendNotification() {
    this.storage.get('userData').then(user => {
      const query = {
        itemId: this.product._id,
        receiver: this.product.addedBy['_id'],
        sender: user._id,
        type: 'like'
      };
      this.angNotification.ifNotificationExists(query).subscribe(res => {
        if (res && res.toString()) {
          console.log('Already exists');
        } else {
          const notification = {
            body: user.name + ' liked your product.',
            itemId: this.product._id,
            receiver: this.product.addedBy['_id'],
            sender: user._id,
            senderImage: user.photo.thumb400Url,
            page: 'hunted-products-page',
            type: 'like',
            date: new Date()
          };
    
          this.angNotification.addNotification(notification);
          this.socket.emit('notification', { data: 'Notification Emitted' });
        }
      });
    });
  }

  getUserLocation(id) {
    if (id) {
      this.count++;
      if (this.count === 1) {
        this.angLocation.getLocationFromZipcode(this.angValues.user.find(x => x.id === id).zipcode).then(data => {
          this.loc = data.city + ", " + data.state;
        });
      }
    } else {
      this.loc = "USA";
    }
  }

  like() {
    if (this.isLiked.flag === true) {
      this.product.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.product.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
    }
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var huntedProductSchema = {
          _id: this.isBookmarked.id,
          huntedProductId: this.product._id
        };

        this.angBookmark.debookmarkProduct(user._id, huntedProductSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Product removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserHuntedProductBookmarksList();
          this.angBookmark.getBookmarkProducts();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkProduct(this.product._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Product saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserHuntedProductBookmarksList();
          this.angBookmark.getBookmarkProducts();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: "You'll be notified when the product is available.",
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    
    toast.onDidDismiss(() => {
      toast.dismiss();
    });
    toast.present();
  }

  openUser() {
    if (this.product.addedBy) {
      this.storage.get('userData').then(user => {
        if (this.product.addedBy['_id'] !== user._id) this.navCtrl.push('user-page', { uid: this.product.addedBy['_id'] });
        else this.navCtrl.push('my-page');
      });
    }
  }

  homePage() {
    this.navCtrl.pop();
  }

  openSlider(key) {
    this.slides.slideTo(key, 500);
  }

  openImage(i) {
    let imagesModal = this.modalCtrl.create('images-page', { index: i, images: this.product.photos });
    imagesModal.present();
  }
}