import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notifications/notification';

@IonicPage({
  segment: 'notification',
  name: 'notification-page'
})
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage implements OnInit {
  // All variables
  public tabsElement: any;
  public notifications: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private angNotification: NotificationProvider
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.notifications = this.angNotification.notifications;

    this.platform.registerBackButtonAction(() => {
      this.homePage();
    });
  }

  ngOnInit() {
    this.notifications.subscribe(res => {
      if (!res) {
        this.angNotification.getNotifications();
      }
    });
  }

  doRefresh(refresher) {
    this.angNotification.getNotifications();
    
    setTimeout(() => {
      refresher.complete();
    }, 3000);
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  homePage() {
    this.navCtrl.pop();
  }
}