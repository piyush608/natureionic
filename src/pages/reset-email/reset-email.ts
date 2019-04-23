import { UserProvider } from './../../providers/user/user';
import { User } from './../../models/user.model';
import { AuthProvider } from "./../../providers/auth/auth";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';

@IonicPage({
  name: "reset-email-page",
  segment: "reset-email"
})
@Component({
  selector: "page-reset-email",
  templateUrl: "reset-email.html"
})
export class ResetEmailPage implements OnInit {
  // All varibales
  public tabsElement: any;

  // Two-way binding
  public user = new User();
  public emailFlag: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.storage.get('userEmail').then(data => {
      this.user.email = data;
    });
  }

  checkEmail() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.user.email) === false) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  // Reset user email
  resetEmail() {
    if (this.emailFlag !== false) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.storage.get('userData').then(user => {
        this.angUser.updateUserDetails(this.user, user._id).subscribe(res => {
          loading.dismiss();
          this.showAlert();
          this.storage.set('userEmail', this.user.email);
        }, err => {
          let alert = this.alertCtrl.create({
            title: "Error",
            subTitle: err,
            buttons: ["Ok"]
          });
          loading.dismiss();
          alert.present();
        });
      });
    }
  }

  showAlert() {
    const confirm = this.alertCtrl.create({
      title: 'Successfully changed your eamil address',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }]
    });
    confirm.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}