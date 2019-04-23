import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForumProvider } from '../../providers/forum/forum';
import { Subscription } from 'rxjs/Subscription';

@IonicPage({
  segment: 'discussions',
  name: 'discussions-page'
})
@Component({
  selector: 'page-discussions',
  templateUrl: 'discussions.html',
})
export class DiscussionsPage {
  public tabsElement: any;
  public sectionHeader: string;
  public forums = [];
  public forumSubscription: Subscription;
  public count = 1;
  public moreForumsFlag: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private angForum: ForumProvider
  ) {
    if (this.navParams.get('flag') === 'trending') this.getTrendingDiscussions();
    else this.getLatestDiscussions();
    
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  doRefresh(refresher) {
    this.refreshPage();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getTrendingDiscussions() {
    this.sectionHeader = 'Trending Now';
    this.forums = this.navParams.get('forums');

    this.angForum.getNextTrendingForums(this.count * 4).subscribe(res => {
      if (res.toString()) {
        this.forums = this.forums.concat(res);
        this.count++;
      } else {
        this.moreForumsFlag = false;
      }
    }, err => {
      this.moreForumsFlag = false;
    });
  }

  getLatestDiscussions() {
    this.sectionHeader = 'Latest Discussions';
    this.forums = this.navParams.get('forums');

    this.angForum.getNextLatestForums(this.count * 4).subscribe(res => {
      if (res.toString()) {
        this.forums = this.forums.concat(res);
        this.count++;
      } else {
        this.moreForumsFlag = false;
      }
    }, err => {
      this.moreForumsFlag = false;
    });
  }

  moreDiscussions(event) {
    if (this.navParams.get('flag') === 'trending') {
      this.angForum.getNextTrendingForums(this.count * 4).subscribe(res => {
        if (res.toString()) {
          this.forums = this.forums.concat(res);
          event.complete();
          this.count++;
        } else {
          event.complete();
          this.moreForumsFlag = false;
        }
      }, err => {
        this.moreForumsFlag = false;
      });
    } else {
      this.angForum.getNextLatestForums(this.count * 4).subscribe(res => {
        if (res.toString()) {
          this.forums = this.forums.concat(res);
          event.complete();
          this.count++;
        } else {
          event.complete();
          this.moreForumsFlag = false;
        }
      }, err => {
        this.moreForumsFlag = false;
      });
    }
  }

  refreshPage() {
    this.count = 0;
    this.forums = [];
    if (this.navParams.get('flag') === 'trending') {
      this.angForum.getNextTrendingForums(this.count * 4).subscribe(res => {
        if (res.toString()) {
          this.forums = res as any[];
          this.count++;
        } else {
          this.moreForumsFlag = false;
        }
      }, err => {
        this.moreForumsFlag = false;
      });
    } else {
      this.angForum.getNextLatestForums(this.count * 4).subscribe(res => {
        if (res.toString()) {
          this.forums = res as any[];
          this.count++;
        } else {
          this.moreForumsFlag = false;
        }
      }, err => {
        this.moreForumsFlag = false;
      });
    }
  }

  prevStep() {
    this.navCtrl.pop();
  }
}