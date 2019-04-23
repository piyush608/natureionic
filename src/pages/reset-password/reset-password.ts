import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "reset-password-page",
  segment: "reset-password"
})
@Component({
  selector: "page-reset-password",
  templateUrl: "reset-password.html"
})
export class ResetPasswordPage {
  public password: string;
  public tabsElement: any;
  public passwordFlag: boolean = true;
  public passwordErrorMessage: string;
  public user = new User();

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.storage.get('userData').then(user => {
      this.user = user;
    });
  }

  ionViewWillEnter() {
    if(this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if(this.tabsElement) this.tabsElement.style.display = "flex";
  }

  checkPassword() {
    if (this.password.length < 8) {
      this.passwordFlag = false;
      this.passwordErrorMessage = 'Must be 8 characters long';
    } else {
      this.passwordFlag = true;
    }
  }

  resetPassword() {
    if (this.passwordFlag !== false && this.password.length >= 8) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.user.password = this.password;
      this.angUser.updateUserPassword(this.user, this.user._id).subscribe(res => {
        loading.dismiss();
        this.showAlert();
      }, err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: 'Unexpected error occured. Please try again later',
          buttons: ["Ok"]
        });
        loading.dismiss();
        alert.present();
      });
    }
  }

  showAlert() {
    const confirm = this.alertCtrl.create({
      title: 'Successfully changed your password',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.navCtrl.popToRoot();
        }
      }]
    });
    confirm.present();
  }

  // Sending user to account page
  goBack() {
    this.navCtrl.pop();
  }
}