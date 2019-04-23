import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user.model';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "signup-page",
  segment: "signup"
})
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  public user = new User();
  public showPassword: boolean = false;
  public inputType = 'password';
  
  public tabsElement: any;

  public emailFlag: boolean = true;
  public passwordFlag: boolean = true;
  public passwordErrorMessage: string;

  constructor(
    public navCtrl: NavController,
    public angAuth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  checkEmail() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.user.email) === false) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }
  }

  checkPassword() {
    if (this.user.password.length < 8) {
      this.passwordFlag = false;
      this.passwordErrorMessage = 'Must be 8 characters long';
      return;
    } else {
      this.passwordFlag = true;
    }
  }

  register() {
    if ((this.emailFlag === false) || (this.passwordFlag === false)) {
      let alert = this.alertCtrl.create({
        title: "Error!",
        subTitle: "Please resolve all the marked issues then submit agian."
      });
      
      alert.present();
    } else {
      const loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loading.present();
      this.angAuth.register(this.user).subscribe(res => {
        this.storage.set('userEmail', this.user.email);
        loading.dismiss();
        this.navCtrl.setRoot('onboarding-page', { token: res['token'], user: res['user'] });
      }, err => {
        console.log(JSON.stringify(err));
        let alert = this.alertCtrl.create({
          title: "Signup Error!",
          subTitle: err.error[0]
        });
        loading.dismiss();
        alert.present();
      });
    }
  }

  managePassword(input: any) {
    this.showPassword = !this.showPassword;
    input.type = input.type === 'password' ?  'text' : 'password';
    this.inputType = input.type;
  }

  loginPage() {
    this.navCtrl.pop();
  }

  openPrivacy() {
    const link = 'https://naturehub.com/privacy-policies.html';
    const browser = this.iab.create(link);
    browser.show();
  }
}