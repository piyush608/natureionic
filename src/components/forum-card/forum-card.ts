import { ValuesProvider } from './../../providers/values/values';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { ForumProvider } from '../../providers/forum/forum';
import { Component, Input, OnInit } from '@angular/core';
import { Hashtag } from '../../models/hashtag.model';
import { BASE_URL } from '../../app/app.url.config';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';

@Component({
  selector: 'forum-card',
  templateUrl: 'forum-card.html'
})
export class ForumCardComponent implements OnInit {
  @Input('item') item: any;
  public url: any;
  imageOption: boolean = false;
  user: Observable<any>;
  liked;
  isLiked;
  postedBy;
  authorImage;
  publishedTime;
  hashTag = new Hashtag();
  forumName: string;
  private socket: any;

  constructor(
    private angForum: ForumProvider, 
    public navCtrl: NavController, 
    private angValues: ValuesProvider,
    private storage: Storage
  ) {
    this.socket = io(BASE_URL);
  }

  ngOnInit() {
    if (this.item.photos && this.item.photos.length > 0) {
      this.imageOption = true;
      if (this.item.title && this.item.title.length > 35) this.forumName = this.item.title.substr(0, 35) + " ...";
      else this.forumName = this.item.title;
    } else {
      if (this.item.title && this.item.title.length > 75) this.forumName = this.item.title.substr(0, 75) + " ...";
      else this.forumName = this.item.title;
    }

    this.angForum.getHashTag(this.item.tag).subscribe(res => {
      this.hashTag = res as Hashtag;
    }, err => {
      console.log(JSON.stringify(err));
    });

    this.getForumTimestamp();
    setInterval(() => {
      this.getForumTimestamp();
    }, 45000);
    
    this.isLikedDisliked();
    setInterval(() => {
      this.isLikedDisliked();
    }, 1500);

    this.socket.on('refreshForumLike', (data) => {
      this.angForum.getUpdatedLikesDislikes(this.item._id).subscribe(res => {
        this.item.likes = res['likes'];
        this.item.likesCollection = res['likesCollection'];
        this.isLikedDisliked();
      });
    });

    this.socket.on('refreshComments', data => {
      this.angForum.getUpdatedComments(this.item._id).subscribe(res => {
        this.item.comments = res['comments'];
      });
    });
  }

  isLikedDisliked() {
    this.storage.get('userData').then(user => {
      if (this.item && this.item.likesCollection.length > 0) {
        for (var i=0; i<this.item.likesCollection.length; i++) {
          if (this.item.likesCollection[i] === user._id) {
            this.liked = true;
            this.isLiked = { id: this.item.likesCollection[i], flag: true };
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
  }

  getForumTimestamp() {
    let originalDate = new Date(this.item.date);
    let endDate = new Date();

    if ((endDate.getTime() - originalDate.getTime())/(1000*60*60*24) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60*24)).toString()) + "d ago";
    else {
      if ((endDate.getTime() - originalDate.getTime())/(1000*60*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60*60)).toString()) + "h ago";
      else {
        if ((endDate.getTime() - originalDate.getTime())/(1000*60) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000*60)).toString()) + "m ago";
        else {
          if ((endDate.getTime() - originalDate.getTime())/(1000) >= 1) this.publishedTime = parseInt(((endDate.getTime() - originalDate.getTime())/(1000)).toString()) + "s ago";
        }
      }
    }
  }

  openForum() {
    this.navCtrl.push('forum-page', { 'data': this.item });
  }

  getForumTag(id) {
    return this.angValues.getForumTag(id);
  }

  like() {
    if (this.isLiked.flag === true) {
      this.item.likes -= 1;
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      this.item.likes += 1;
      this.isLiked.flag = !this.isLiked.flag;
    }
  }
}