import { Hashtag } from './../../models/hashtag.model';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { UploadImageProvider } from '../../providers/upload-image/upload-image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ForumProvider } from '../../providers/forum/forum';
import { DomSanitizer } from '@angular/platform-browser';
import { Forum } from './../../models/forum.model';
import { Component } from '@angular/core';
import { SearchProvider } from '../../providers/search/search';
import dataUriToBuffer from 'data-uri-to-buffer';
import { User } from '../../models/user.model';
import { LikeProvider } from '../../providers/like/like';
import * as io from 'socket.io-client';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';

@IonicPage({
  segment: 'add-forum',
  name: 'add-forum-page'
})
@Component({
  selector: 'page-add-forum',
  templateUrl: 'add-forum.html',
})
export class AddForumPage {
  img = [];
  image = [];
  flag: boolean;
  imageFlag: boolean = false;
  tabsElement: any;
  forum = new Forum;
  imageSelect: string;
  stepCount: number = 0;
  options: CameraOptions;
  firstButtonClicked: boolean = false;
  loading: any;
  postOption: string;
  optionFlag: boolean;
  hashExists:boolean = false;
  isLiked: any;
  isDisliked: any;
  liked: boolean;
  disliked: boolean;
  comment;
  publishedTime;
  commentCollection = [];
  
  public hashTag = new Hashtag();
  public searchList: boolean = false;
  public hashFlag: boolean = false;
  public searchedHashtags: any;
  public socket: any;

  // Validation variables
  nameFlag: boolean = true;
  nameText: string = 'Name is required';
  hashtagFlag: boolean = true;
  hashtagText: string = 'Hashtag is required';

  public stayFlag: boolean = false;
  public user = new User();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _DomSanitizationService: DomSanitizer,
    public modalCtrl: ModalController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public uploadImage: UploadImageProvider,
    private angForum: ForumProvider,
    private angSearch: SearchProvider,
    private angLike: LikeProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.socket = io(BASE_URL);
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";

    if (this.isLiked) {
      this.storage.get('userData').then(user => {
        if (this.liked !== this.isLiked.flag) {
          this.angLike.likeForum(this.forum._id, user._id).subscribe(res => {
            this.socket.emit('likeForum', { data: 'Like Forum Emitted' });
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
  
        if (this.disliked !== this.isDisliked.flag) {
          this.angLike.dislikeForum(this.forum._id, user._id).subscribe(res => {
            this.socket.emit('disLikeForum', { data: 'Dislike Forum Emitted' });
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      });
    }
  }

  checkName() {
    if (this.forum.title.length > 0) {
      if (this.forum.title.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.nameFlag = false;
        this.nameText = 'Must contain atleast one character';
      } else {
        this.nameFlag = true;
      }
    } else {
      this.nameFlag = false;
      this.nameText = 'Name is required';
    }
  }

  checkHashtag() {
    if (this.hashTag.name.length > 0) {
      if (this.hashTag.name.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.hashtagFlag = false;
        this.hashtagText = 'Must contain atleast two character';
      } else {
        if (this.hashTag.name.split(' ').filter(function (n) { return n != '' }).length > 1) {
          this.hashtagFlag = false;
          this.hashtagText = 'Can not contain space';
        } else {
          this.hashtagFlag = true;
        }
      }
    } else {
      this.hashtagFlag = false;
      this.hashtagText = 'Hashtag is required';
    }
  }

  presentModal() {
    let optionModal = this.modalCtrl.create("camera-option-page");

    optionModal.present();
    optionModal.onWillDismiss(data => {
      if (data.flag !== false) {
        this.imageFlag = true;
        this.image.push(data.image);
        this.img.push(data.blob);
      }
    });
  }

  checkHashTags(event) {
    if (event.length >= 2) {
      const query = {
        name: event.toLowerCase()
      };
      this.angSearch.searchHashtags(query).subscribe(res => {
        if (res.toString()) {
          this.searchList = true;
          this.hashFlag = true;
          this.searchedHashtags = res;
        } else {
          this.searchList = false;
          this.hashFlag = false;
        }
      }, err => {
        this.searchList = false;
        this.hashFlag = false;
      });
    } else {
      this.searchedHashtags = [];
      this.searchList = false;
      this.hashFlag = false;
    }
  }

  selectHashtag(item) {
    this.searchList = false;
    this.hashFlag = true;
    this.hashTag = item;
    this.forum.tag = item['_id'];
    this.searchedHashtags = [];
  }
  
  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  deleteImage(key) {
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });
    loader.present();
    this.image.splice(key, 1);
    this.img.splice(key, 1);
    this.imageFlag = false;
    loader.dismiss();
  }

  uploadForum() {
    if (this.nameFlag === true && this.hashtagFlag === true) {
      if (this.forum.title && this.hashTag.name) {
        if (this.hashFlag === true) {
          this.addForum();
        } else {
          this.hashTag.nameLower = this.hashTag.name.toLowerCase();
          this.angForum.addHashTag(this.hashTag).subscribe(res => {
            this.forum.tag = res['hashtag']._id;
            this.addForum();
          }, err => {
            console.log(JSON.stringify(err));
          });
        }
      } else {
        if (!this.forum.title) this.nameFlag = false;
        if (!this.hashTag.name) this.hashtagFlag = false;
      }
    }
  }

  addForum() {
    this.storage.get('userData').then(data => {
      this.forum.addedBy = data._id;
      this.user = data;
      this.forum.date = new Date();

      this.angForum.addForum(this.forum).subscribe(forum => {
        this.forum._id = forum['forum']._id;
        this.forum.likes = 0;
        this.forum.dislikes = 0;
        this.forum.comments = 0;
        this.forum.likesCollection = [];
        this.forum.dislikesCollection = [];
        this.forum.addedBy = {
          _id: data._id,
          name: data.name,
          photo: {
            thumb200Url: data.photo.thumb400Url
          }
        };
        this.forum.tag = {
          name: this.hashTag.name
        };

        if (this.imageFlag === true) {
          this.uploadForumImage();
        } else {
          this.navCtrl.push('forum-page', { 'id': forum['forum']._id, 'data': this.forum, 'back': 'no' });
        }
      }, err => {
        console.log(JSON.stringify(err));
      });
    });
  }

  uploadForumImage() {
    this.img.forEach((image, index) => {
      this.uploadImage.uploadForumImages(this.forum._id, image);
      this.isLiked = { id: null, flag: false };
      this.liked = false;
      this.isDisliked = { id: null, flag: false };
      this.disliked = false;
      this.stayFlag = true;
      setInterval(() => {
        this.getForumTimestamp();
      }, 45000);
    });
  }

  getForumTimestamp() {
    let originalDate = this.forum.date;
    let endDate = new Date();

    if ((endDate.getTime() - originalDate.getTime())/(1000*60*60*24) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60*24)).toString()) + "d ago";
    else {
      if ((endDate.getTime() - originalDate.getTime())/(1000*60*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60)).toString()) + "h ago";
      else {
        if ((endDate.getTime() - originalDate.getTime())/(1000*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60)).toString()) + "m ago";
        else {
          if ((endDate.getTime() - originalDate.getTime())/(1000) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000)).toString()) + "s ago";
          else this.publishedTime = " now";
        }
      }
    }
  }

  nextStep() {
    this.uploadForum();
  }

  prevStep() {
    this.navCtrl.pop();
  }

  homePage() {
    this.navCtrl.popToRoot();
  }

  openUser() {
    this.navCtrl.push('my-page');
  }

  like() {
    if (this.isLiked.flag === true) {
      this.forum.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.forum.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
      if (this.isDisliked.flag === true) {
        this.forum.dislikes -= 1;
        this.isDisliked.flag = !this.isDisliked.flag;
      }
    }
  }

  dislike() {
    if (this.isDisliked.flag === true) {
      this.forum.dislikes -= 1;
      this.isDisliked.flag = !this.isDisliked.flag;
    } else {
      this.forum.dislikes += 1;
      this.isDisliked.flag = !this.isDisliked.flag;
      if (this.isLiked.flag === true) {
        this.forum.likes -= 1;
        this.isLiked.flag = !this.isLiked.flag;
      }
    }
  }

  submitComment() {
    if (this.comment.split(' ').filter(function (n) { return n != '' }).length >= 1) {
      const loader = this.loadingCtrl.create({
        content: "Please wait..."
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
}