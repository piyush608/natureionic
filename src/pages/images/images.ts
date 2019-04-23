import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController, Platform } from 'ionic-angular';

@IonicPage({
  name: 'images-page',
  segment: 'images'
})
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {
  @ViewChild(Slides) slides: Slides;
  images: any;
  i: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public platform: Platform
  ) {
    this.i = this.navParams.get('index');
    this.images = this.navParams.get('images');

    this.platform.registerBackButtonAction(() => {
      this.closeModal();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}