import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { AlertController, LoadingController } from "ionic-angular";
import { IonicPage, NavController } from "ionic-angular";

@IonicPage({
  name: "forget-password-page",
  segment: "forget-password"
})
@Component({
  selector: "page-forget-password",
  templateUrl: "forget-password.html"
})
export class ForgetPasswordPage {
  public email: string;
  public tabsElement: any;

  constructor(
    public navCtrl: NavController,
    public angAuth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  // Send a password reset email
  forgetPassword() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    this.angAuth.forgotPassword(this.email).subscribe(res => {
      let alert = this.alertCtrl.create({
        title: "Password Reset",
        subTitle: "A reset password email has been sent on your email",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.navCtrl.setRoot('login-page');
            }
          }
        ]
      });
      loading.dismiss();
      alert.present();
    }, err => {
      let alert = this.alertCtrl.create({
        title: "Error Occured",
        subTitle: "There is some unexpected error uccured. Please try again later.",
        buttons: [
          {
            text: "OK",
            handler: () => {
              this.navCtrl.setRoot('login-page');
            }
          }
        ]
      });
      loading.dismiss();
      alert.present();
    });
  }

  // Redirect to Login page
  sendBack() {
    this.navCtrl.pop();
  }
}