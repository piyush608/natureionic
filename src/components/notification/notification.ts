import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notifications/notification';

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent implements OnInit {
  @Input('item') notification = new Notification();
  public timeDiff: any;
  public isLiked: boolean = false;
  public isFollow: boolean = false;

  constructor(
    private _DomSanitizationService: DomSanitizer, 
    public navCtrl: NavController, 
    private angNotification: NotificationProvider
  ) {
  }

  ngOnInit() {
    if (!this.notification.senderImage) this.notification.senderImage = './../assets/imgs/defaultUser.png';
    this.checkTimeDiff();
    setInterval(() => {
      this.checkTimeDiff();
    }, 45000);

    if (this.notification.type === 'like') this.isLiked = true;
    else if (this.notification.type === 'follow') this.isFollow = true;
  }

  checkTimeDiff() {
    let startDate = new Date(this.notification.date);
    let endDate   = new Date();

    if ((endDate.getTime() - startDate.getTime())/(1000*60*60*24) >= 1) this.timeDiff = parseInt(((endDate.getTime() - startDate.getTime())/(1000*60*60*24)).toString()) + "d";
    else {
      if ((endDate.getTime() - startDate.getTime())/(1000*60*60) >= 1) this.timeDiff = parseInt(((endDate.getTime() - startDate.getTime())/(1000*60*60)).toString()) + "h";
      else {
        if ((endDate.getTime() - startDate.getTime())/(1000*60) >= 1) this.timeDiff = parseInt(((endDate.getTime() - startDate.getTime())/(1000*60)).toString()) + "m";
        else {
          if ((endDate.getTime() - startDate.getTime())/(1000) >= 1) this.timeDiff = parseInt(((endDate.getTime() - startDate.getTime())/(1000)).toString()) + "s";
        }
      }
    }
  }

  openNotification() {
    this.updateNotificationStatus();
    this.navCtrl.push(this.notification.page, { _id: this.notification.itemId });
  }

  openUser() {
    this.updateNotificationStatus();
    if (this.notification.sender) {
      this.navCtrl.push(this.notification.page, { _id: this.notification.sender });
    }
  }

  updateNotificationStatus() {
    if (this.notification.status !== true) {
      this.notification.status = true;
      this.angNotification.updateNotification(this.notification);
      this.angNotification.getNotifications();
    }
  }

  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }
}