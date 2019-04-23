import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'following-page',
  segment: 'following'
})
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {
  tabsElement: any;
  followings = [];
  items = [];
  flag: boolean = true;
  searchFlag: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.storage.get('userData').then(user => {
      this.angUser.getUserFollowers(user._id).subscribe(res => {
        this.followings = [];
        if (res && res['user'].followings.length>0) {
          this.followings = res['user'].followings;
          this.flag = false;
        } else {
          this.flag = false;
          this.followings = [];
        }
      });
    });
  }

  doRefresh(refresher) {
    this.storage.get('userData').then(user => {
      this.angUser.getUserFollowers(user._id).subscribe(res => {
        this.followings = [];
        if (res && res['user'].followings.length>0) {
          this.followings = res['user'].followings;
        }
      });
    });

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  intializeFollowers() {
    this.items = [];
    this.items = this.followings;
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getItems(ev) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.searchFlag = true;
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.intializeFollowers();
      this.searchFlag = false;
    }
  }

  prevStep() {
    this.navCtrl.pop();
  }
}