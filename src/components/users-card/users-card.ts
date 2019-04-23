import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'users-card',
  templateUrl: 'users-card.html'
})
export class UsersCardComponent {
  @Input('item') user: any;
  followText: string;
  doesFollow: any;
  flag: boolean;
  show: boolean = false;
  docId: string;

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
  }

  ngOnInit() {
  }

  openUser(userId) {
    this.storage.get('userData').then(data => {
      if(data._id === userId) this.navCtrl.push('my-page');
      else this.navCtrl.push('user-page', { uid: userId });
    });
  }
}