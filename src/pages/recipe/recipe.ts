import { BookmarkProvider } from './../../providers/bookmark/bookmark';
import { LikeProvider } from "./../../providers/like/like";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, ModalController, ToastController, Platform } from "ionic-angular";
import { FireProvider } from "../../providers/fire/fire";
import { LocationProvider } from '../../providers/location/location';
import { RecipeProvider } from "../../providers/recipe/recipe";
import { Recipe } from '../../models/recipe.model';
import { UserProvider } from '../../providers/user/user';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Subscription } from 'rxjs/Subscription';
import { NotificationProvider } from '../../providers/notifications/notification';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "recipe-page",
  segment: "recipe/:recipeId"
})
@Component({
  selector: "page-recipe",
  templateUrl: "recipe.html"
})
export class RecipePage {
  @ViewChild(Slides) slides: Slides;
  public recipe = new Recipe;
  public tabsElement: any;
  
  isLiked;
  isBookmarked;
  liked;
  bookmarked;
  tags;
  uid;
  userLocation;
  userLocationFlag: boolean = false;

  userPoints;
  recipeLikePoints;
  recipeDislikePoints;
  count = 0;
  loc: string;
  userId: any;
  username: string;
  singleRecipeImage: any;
  currentLocation: {
    city: string,
    state: string
  };

  public recipeCat: any;
  public recipeSubcat: any;
  public authorImage: any;
  public postedBy: any;
  public postedFrom: any;

  public pageLoadFlag: boolean = true;

  private appExitSubscriber: Subscription;
  private socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angFire: FireProvider,
    public auth: AuthProvider,
    public angLocation: LocationProvider,
    private angLike: LikeProvider,
    private angRecipe: RecipeProvider,
    private alertCtrl: AlertController,
    private angBookmark: BookmarkProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private angUser: UserProvider,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    if (this.navParams.get("recipe")) {
      this.recipe = this.navParams.get("recipe");
      this.loadAllDetails();
      this.pageLoadFlag = false;
    } else {
      this.getRecipeDetails();
    }

    this.socket = io(BASE_URL);

    this.storage.get('pointSystems').then(res => {
      res.map(data => {
        if (data.query === 'like_recipe') {
          this.recipeLikePoints = data.point;
        } else {
          this.recipeLikePoints = 0;
        }

        if (data.query === 'dislike_recipe') {
          this.recipeDislikePoints = data.point;
        } else {
          this.recipeDislikePoints = 0;
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
    this.socket.on('refreshRecipeLike', (data) => {
      this.angRecipe.getUpdatedLikes(this.recipe._id).subscribe(res => {
        this.recipe.likes = res['likes'];
        this.recipe.likesCollection = res['likesCollection'];
        this.checkIfLiked();
      });
    });
  }

  doRefresh(refresher) {
    this.checkLikeAndBookmark();
    
    setTimeout(() => {
      this.getRecipeDetails();
      refresher.complete();
    }, 2000);
  }

  getRecipeDetails() {
    if (this.navParams.get("_id")) {
      this.angRecipe.getRecipeDetails(this.navParams.get("_id")).subscribe(data => {
        this.recipe = data as Recipe;
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
      this.angRecipe.getRecipeDetails(this.recipe._id).subscribe(data => {
        this.recipe = data as Recipe;
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
    if (this.recipe.category) {
      this.angRecipe.getRecipeCategory(this.recipe.category['_id']).subscribe(res => {
        res['subCategories'].map(subcat => {
          if (subcat._id === this.recipe.subCategory) {
            this.recipeSubcat = subcat.name;
            return;
          }
        });
      });
    }

    if (this.recipe.addedBy) {
      this.angLocation.getLocationFromZipcode(this.recipe.addedBy['zipcode'].toString()).then(loc => {
        this.currentLocation = loc;
      });
    }
    this.checkIfLiked();

    this.angUser.bookmarkedRecipesList.subscribe(recipes => {
      if (recipes && recipes.length > 0) {
        for (let index = 0; index < recipes.length; index++) {
          if (this.recipe._id === recipes[index]) {
            this.isBookmarked = { id: recipes[index], flag: true };
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
      this.angRecipe.getUpdatedLikes(this.recipe._id).subscribe(res => {
        this.recipe.likes = res['likes'];
        this.recipe.likesCollection = res['likesCollection'];
        if (this.recipe.likesCollection.length > 0) {
          for (var i=0; i<this.recipe.likesCollection.length; i++) {
            if (this.recipe.likesCollection[i] === user._id) {
              this.liked = true;
              this.isLiked = { id: this.recipe.likesCollection[i], flag: true };
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

          this.angLike.dislikeRecipe(this.recipe._id, userSchema).subscribe(res => {
            this.socket.emit('disLikeRecipe', { data: 'Dislike Recipe Emitted' });
            if (this.recipe.addedBy && user._id !== this.recipe.addedBy['_id']) this.angUser.updateUserPoint(this.recipe.addedBy['_id'], this.recipeDislikePoints);
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angLike.likeRecipe(this.recipe._id, user._id).subscribe(res => {
            this.socket.emit('likeRecipe', { data: 'Like Recipe Emitted' });
            if (this.recipe.addedBy && user._id !== this.recipe.addedBy['_id']) {
              this.angUser.updateUserPoint(this.recipe.addedBy['_id'], this.recipeLikePoints);
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
        itemId: this.recipe._id,
        receiver: this.recipe.addedBy['_id'],
        sender: user._id,
        type: 'like'
      };
      this.angNotification.ifNotificationExists(query).subscribe(res => {
        if (res && res.toString()) {
          console.log('Already exists');
        } else {
          const notification = {
            body: user.name + ' liked your recipe.',
            itemId: this.recipe._id,
            receiver: this.recipe.addedBy['_id'],
            sender: user._id,
            senderImage: user.photo.thumb400Url,
            page: 'recipe-page',
            type: 'like',
            date: new Date()
          };

          this.angNotification.addNotification(notification);
          this.socket.emit('notification', { data: 'Notification Emitted' });
        }
      });
    });
  }

  homePage() {
    this.navCtrl.pop();
  }

  like() {
    if (this.isLiked.flag === true) {
      this.recipe.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.recipe.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
    }
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var recipeSchema = {
          _id: this.isBookmarked.id,
          recipeId: this.recipe._id
        };

        this.angBookmark.debookmarkRecipe(user._id, recipeSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Recipe removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserRecipeBookmarksList();
          this.angBookmark.getBookmarkedRecipes();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkRecipe(this.recipe._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Recipe saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserRecipeBookmarksList();
          this.angBookmark.getBookmarkedRecipes();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  openUser() {
    if (this.recipe.addedBy) {
      this.storage.get('userData').then(user => {
        if (this.recipe.addedBy['_id'] !== user._id) this.navCtrl.push('user-page', { uid: this.recipe.addedBy['_id'] });
        else this.navCtrl.push('my-page');
      });
    }
  }

  openSlider(key) {
    this.slides.slideTo(key, 500);
  }

  openImage(i) {
    let imagesModal = this.modalCtrl.create('images-page', { index: i, images: this.recipe.photos });
    imagesModal.present();
  }

  socialshare() {
    this.socialSharing.share("Here's how to make " + this.recipe.name.toLowerCase(), this.recipe.name, 'https://www.naturehub.com/images/recipe_share_default.png', 'https://ntrhub.com/recipe/' + this.recipe._id).then(success => {
      console.log(JSON.stringify(success));
    }).catch(err => {
      console.log(JSON.stringify(err));
    });
  }
}