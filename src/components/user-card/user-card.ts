import { Component, Input, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent implements OnInit {
  @Input('doc') doc: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
  }

  openUser() {
    this.navCtrl.push('user-page', { uid: this.doc['_id'] });
  }
}