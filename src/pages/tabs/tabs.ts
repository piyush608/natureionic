import { CollectionsPage } from './../collections/collections';
import { InspirationPage } from './../inspiration/inspiration';
import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NotificationProvider } from '../../providers/notifications/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  tab1Root = HomePage;
  tab2Root = InspirationPage;
  tab3Root = CollectionsPage;
  tab4Root = ProfilePage;
  count: number = 0;
  tabIndex: number = 0;
  notifications = [];

  constructor(
    private angNotification: NotificationProvider
  ) {
  }

  ngOnInit() {
    this.angNotification.notifications.subscribe(res => {
      this.count = 0;
      if (res) {
        res.map(data => {
          if (data.status === false) this.count += 1;
        });
      }
    });
  }
}
