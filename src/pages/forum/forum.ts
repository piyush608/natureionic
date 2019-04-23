import { Content, Platform } from 'ionic-angular';
import { LikeProvider } from './../../providers/like/like';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";
import { Forum } from "./../../models/forum.model";
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from "ionic-angular";
import { ForumProvider } from "../../providers/forum/forum";
import { ValuesProvider } from "../../providers/values/values";
import { Hashtag } from '../../models/hashtag.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationProvider } from '../../providers/notifications/notification';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';

@IonicPage({
  segment: "forum",
  name: "forum-page"
})
@Component({
  selector: "page-forum",
  templateUrl: "forum.html"
})
export class ForumPage {
  @ViewChild(Content) forumContent: Content;
  publishedTime :any;
  loc: string;
  isLiked: any;
  isDisliked: any;
  imageOption: boolean = false;
  imageUrl: any;
  liked: boolean;
  disliked: boolean;
  tabsElement: any;
  count: number = 0;
  forum = new Forum();
  hashTag = new Hashtag();
  forumLike$: Subscription;
  forumDislike$: Subscription;
  forumComments: Observable<any>;
  comment: string;
  senderImage;
  postedUsername: string;
  username: string;
  userImage: string;
  appExitSubscriber: Subscription;
  pageLoadFlag: boolean = true;

  public postedBy;
  public authorImage;
  public imageParam: boolean = false;
  private socket: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angForum: ForumProvider,
    private angValues: ValuesProvider,
    private _DomSanitizationService: DomSanitizer,
    private angLike: LikeProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private angNotification: NotificationProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.socket = io(BASE_URL);

    if (this.navParams.get("data")) {
      this.forum = this.navParams.get("data") as Forum;
      this.getAllDetails();
      this.getForumTimestamp();
      this.pageLoadFlag = false;
      setInterval(() => {
        this.getForumTimestamp();
      }, 45000);
    } else this.getForumDetails();

    this.platform.registerBackButtonAction(() => {
      this.homePage();
    });

    this.appExitSubscriber = this.platform.pause.subscribe(res => {
      this.checkLikeAndBookmark();
    });
  }

  ngOnInit() {
    this.socket.on('refreshForumLike', (data) => {
      this.angForum.getUpdatedLikesDislikes(this.forum._id).subscribe(res => {
        console.log('Deidara ' + JSON.stringify(res));
        this.forum.likes = res['likes'];
        this.forum.dislikes = res['dislikes'];
        this.forum.likesCollection = res['likesCollection'];
        this.forum.dislikesCollection = res['dislikesCollection'];
        this.checkIfLiked();
      });
    });

    this.socket.on('refreshComments', data => {
      this.angForum.getUpdatedComments(this.forum._id).subscribe(res => {
        this.forum.comments = res['comments'];
        this.forum.commentsCollection = res['commentsCollection'];
      });
    });
  }

  doRefresh(refresher) {
    this.checkLikeAndBookmark();

    setTimeout(() => {
      this.getForumDetails();
      refresher.complete();
    }, 3000);
  }

  getForumDetails() {
    if (this.navParams.get("_id")) {
      this.angForum.getForumDetails(this.navParams.get("_id")).subscribe(data => {
        this.forum = data as Forum;
        this.getForumTimestamp();
        this.pageLoadFlag = false;
        this.getAllDetails()
        setInterval(() => {
          this.getForumTimestamp();
        }, 45000);
      });
    } else {
      this.angForum.getForumDetails(this.forum._id).subscribe(data => {
        this.forum = data as Forum;
        this.getForumTimestamp();
        this.getAllDetails()
        setInterval(() => {
          this.getForumTimestamp();
        }, 45000);
      });
    }
  }

  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  getAllDetails() {
    if (this.forum.photos) {
      if (this.forum.photos.length > 0) {
        this.forum.photos.map(image => {
          this.imageOption = true;
          this.imageUrl = image['thumb400Url'];
        });
      } else {
        this.imageOption = false;
      }
    } else {
      this.imageOption = false;
    }

    this.checkIfLiked();
  }

  checkIfLiked() {
    this.storage.get('userData').then(user => {
      this.angForum.getUpdatedLikesDislikes(this.forum._id).subscribe(res => {
        this.forum.likes = res['likes'];
        this.forum.dislikes = res['dislikes'];
        this.forum.likesCollection = res['likesCollection'];
        this.forum.dislikesCollection = res['dislikesCollection'];
        if (this.forum.likesCollection && this.forum.likesCollection.length > 0) {
          for (var i=0; i<this.forum.likesCollection.length; i++) {
            if (this.forum.likesCollection[i] === user._id) {
              this.liked = true;
              this.isLiked = { id: this.forum.likesCollection[i], flag: true };
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
  
        if (this.forum.dislikesCollection && this.forum.dislikesCollection.length > 0) {
          for (var j=0; j<this.forum.dislikesCollection.length; j++) {
            if (this.forum.dislikesCollection[j] === user._id) {
              this.disliked = true;
              this.isDisliked = { id: this.forum.dislikesCollection[j], flag: true };
              break;
            } else {
              this.isDisliked = { id: null, flag: false };
              this.disliked = false;
            }
          };
        } else {
          this.isDisliked = { id: null, flag: false };
          this.disliked = false;
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
  }

  sendNotification() {
    this.storage.get('userData').then(user => {
      const query = {
        itemId: this.forum._id,
        receiver: this.forum.addedBy['_id'],
        sender: user._id,
        type: 'like'
      };
      this.angNotification.ifNotificationExists(query).subscribe(res => {
        if (res && res.toString()) {
          console.log('Already exists');
        } else {
          const notification = {
            body: user.name + ' liked your forum.',
            itemId: this.forum._id,
            receiver: this.forum.addedBy['_id'],
            sender: user._id,
            senderImage: user.photo.thumb400Url,
            page: 'forum-page',
            type: 'like',
            date: new Date()
          };
    
          this.angNotification.addNotification(notification);
          this.socket.emit('notification', { data: 'Notification Emitted' });
        }
      });
    });
  }

  checkLikeAndBookmark() {
    this.storage.get('userData').then(user => {
      if (this.liked !== this.isLiked.flag) {
        if (this.liked === true) {
          var userSchema = {
            id: user._id
          };

          this.angLike.unlikeForum(this.forum._id, userSchema).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angLike.likeForum(this.forum._id, user._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
          if (this.forum.addedBy['_id'] !== user._id) this.sendNotification();
        }
      }

      if (this.disliked !== this.isDisliked.flag) {
        if (this.disliked === true) {
          var userScheme = {
            id: user._id
          };

          this.angLike.unDislikeForum(this.forum._id, userScheme).subscribe(res => {
            console.log(JSON.stringify(res));            
          }, err => {
            console.log(JSON.stringify(err));
          });
        } else {
          this.angLike.dislikeForum(this.forum._id, user._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      }

      setTimeout(() => {
        this.socket.emit('likeForum', { data: 'Like Forum Emitted' });
      }, 2000);
    });
  }

  getForumTimestamp() {
    let originalDate = new Date(this.forum.date);
    let endDate = new Date();

    if ((endDate.getTime() - originalDate.getTime())/(1000*60*60*24) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60*24)).toString()) + "d ago";
    else {
      if ((endDate.getTime() - originalDate.getTime())/(1000*60*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60)).toString()) + "h ago";
      else {
        if ((endDate.getTime() - originalDate.getTime())/(1000*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60)).toString()) + "m ago";
        else {
          if ((endDate.getTime() - originalDate.getTime())/(1000) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000)).toString()) + "s ago";
          else this.publishedTime = 'now';
        }
      }
    }
  }

  submitComment() {
    if (this.comment.split(' ').filter(function (n) { return n != '' }).length >= 1) {
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();

      this.storage.get('userData').then(user => {
        const commentCollection = {
          addedBy: user._id,
          comment: this.comment,
          date: new Date()
        };

        this.angForum.addComment(this.forum._id, commentCollection).subscribe(res => {
          this.socket.emit('addComment', { data: 'Comment Forum Emitted' });
          const body = {
            body: user.name + ' reply to your post',
            comment: this.comment,
            itemId: this.forum._id,
            receiver: this.forum.addedBy['_id'],
            sender: user._id,
            page: 'forum-page',
            senderImage: user.photo.thumb400Url,
            type: 'comment',
            date: new Date()
          };
          if (body.sender !== body.receiver) this.angNotification.addNotification(body);
          this.socket.emit('notification', { data: 'Notification Emitted' });
          
          commentCollection.addedBy = {
            _id: user._id,
            name: user.name,
            photo: {
              thumb200Url: user.photo.thumb400Url
            }
          };
          this.forum.commentsCollection.push(commentCollection);
          this.forum.comments += 1;
          this.comment = '';
          loader.dismiss();
        }, err => {
          console.log(JSON.stringify(err));
          this.comment = '';
          loader.dismiss();
        });
      });
    }
  }

  getUserImage(id) {
    this.userImage = this.angValues.getUserImage(id);
  }

  openUser() {
    if (this.forum.addedBy) {
      this.storage.get('userData').then(user => {
        if (this.forum.addedBy['_id'] !== user._id) this.navCtrl.push('user-page', { uid: this.forum.addedBy['_id'] });
        else this.navCtrl.push('my-page');
      });
    }
  }

  getUserName(id) {
    return this.angValues.getUserName(id);
  }

  like() {
    this.storage.get('userData').then(user => {
      if (this.isLiked.flag === true) {
        this.forum.likes -= 1;
        this.isLiked.flag = !this.isLiked.flag;

        if (this.forum.likesCollection.find(x => x === user._id)) {
          this.forum.likesCollection.splice(this.forum.likesCollection.findIndex(x => x === user._id), 1);
        }
      } else {
        this.forum.likes += 1;
        this.isLiked.flag = !this.isLiked.flag;
        this.forum.likesCollection.push(user._id);
        if (this.isDisliked.flag === true) {
          this.forum.dislikes -= 1;
          this.isDisliked.flag = !this.isDisliked.flag;

          if (this.forum.dislikesCollection.find(x => x === user._id)) {
            this.forum.dislikesCollection.splice(this.forum.dislikesCollection.findIndex(x => x === user._id), 1);
          }
        }
      }
    });
  }

  dislike() {
    this.storage.get('userData').then(user => {
      if (this.isDisliked.flag === true) {
        this.forum.dislikes -= 1;
        this.isDisliked.flag = !this.isDisliked.flag;
        
        if (this.forum.dislikesCollection.find(x => x === user._id)) {
          this.forum.dislikesCollection.splice(this.forum.dislikesCollection.findIndex(x => x === user._id), 1);
        }
      } else {
        this.forum.dislikes += 1;
        this.isDisliked.flag = !this.isDisliked.flag;
        this.forum.dislikesCollection.push(user._id);
        if (this.isLiked.flag === true) {
          this.forum.likes -= 1;
          this.isLiked.flag = !this.isLiked.flag;

          if (this.forum.likesCollection.find(x => x === user._id)) {
            this.forum.likesCollection.splice(this.forum.likesCollection.findIndex(x => x === user._id), 1);
          }
        }
      }
    });
  }

  homePage() {
    if (this.navParams.get('back')) this.navCtrl.popToRoot();
    else this.navCtrl.pop();
  }

  openImage() {
    let imagesModal = this.modalCtrl.create('images-page', { index: 0, images: this.forum.photos });
    imagesModal.present();
  }
}
