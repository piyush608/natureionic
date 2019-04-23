import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'intro-page',
  segment: 'intro'
})
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  // Sending to login page
  skip() {
    // Setting intro to true
    this.storage.set('intro', true);
    this.navCtrl.setRoot('login-page');
  }
}
