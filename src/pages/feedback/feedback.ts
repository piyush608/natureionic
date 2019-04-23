import { FireProvider } from './../../providers/fire/fire';
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

@IonicPage({
  name: 'feedback-page',
  segment: 'feedback'
})
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})


export class FeedbackPage {
  tabsElement: any;
  message: string;
  flag: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angFire: FireProvider,
    public element: ElementRef,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  prevStep() {
    this.navCtrl.pop();
  }

  submitFeedback() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    if (this.message.split(' ').filter(function (n) { return n != '' }).length !== 0) {
      this.angFire.submitFeedback(this.message).subscribe(res => {
        this.flag = true;
        this.message = '';
        loading.dismiss();
      }, err => {
        this.message = '';
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Some unexpected error occured. Please try again later.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    } else {
      loading.dismiss();
    }
  }

  homepage() {
    this.navCtrl.popToRoot();
  }
}