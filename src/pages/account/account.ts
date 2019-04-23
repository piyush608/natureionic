import { AuthProvider } from './../../providers/auth/auth';
import { FireProvider } from './../../providers/fire/fire';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'account-page',
  segment: 'account'
})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})

export class AccountPage implements OnInit {
  public email: string;
  public password: string = "**********";
  public tabsElement: any;

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public angFire: FireProvider,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.storage.get('userEmail').then(data => {
      this.email = data;
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = 'none';
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = 'flex';
  }

  // Sending user to Profile page
  goBack() {
    this.navCtrl.pop();
  }

  // Send to reset email page
  resetEmail() {
    this.navCtrl.push('reset-email-page');
  }

  // Send to reset password page
  resetPassword() {
    this.navCtrl.push('reset-password-page');
  }
}