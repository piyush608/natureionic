import { Component, Input } from '@angular/core';
import { BookmarkProvider } from './../../providers/bookmark/bookmark';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ToastController, Platform } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'article-card',
  templateUrl: 'article-card.html'
})
export class ArticleCardComponent {
  @Input('item') item: any;
  articleName: string;
  articleCategory: any;
  url: string = 'assets/imgs/default-image.png';
  flag: boolean;
  isBookmarked;
  bookmarked;

  constructor(
    private iab: InAppBrowser,
    private angBookmark: BookmarkProvider,
    private toastCtrl: ToastController,
    public platform: Platform,
    private angUser: UserProvider,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    let threshHoldLength = this.item.length > 61 ? 61 : 41;

    if (this.platform.width() >= 414) {
      if (this.item.title.length > 61) this.articleName = this.item.title.substr(0, 60) + " ...";
      else this.articleName = this.item.title;
    } else if (this.platform.width() >= 320) {
      if (this.item.title.length > 41) this.articleName = this.item.title.substr(0, 40) + " ...";
      else this.articleName = this.item.title;
    } else {
      if (this.item.title.length > threshHoldLength) this.articleName = this.item.title.substr(0, threshHoldLength) + " ...";
      else this.articleName = this.item.title;
    }

    this.angUser.bookmarkedArticlesList.subscribe(res => {
      if (res && res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (this.item._id === res[index]) {
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

  showArticle(url: string) {
    if (url.indexOf('//') === -1) url = 'https://' + url;

    const browser = this.iab.create(url);
    browser.show();
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var articleSchema = {
          _id: this.isBookmarked.id,
          articleId: this.item._id
        };

        this.angBookmark.debookmarkArticle(user._id, articleSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Article removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserArticleBookmarksList();
          this.angBookmark.getBookmarkArticles();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkArticle(this.item._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Article saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserArticleBookmarksList();
          this.angBookmark.getBookmarkArticles();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }
}