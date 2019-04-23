import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "login-page",
  segment: "login"
})
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  public user = new User();
  public showPassword: boolean = false;
  public inputType = 'password';
  
  private loading;
  public tabsElement: any;

  public emailFlag: boolean = true;
  public passwordFlag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public angAuth: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private angUser: UserProvider,
    private iab: InAppBrowser,
    private storage: Storage
  ) {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  managePassword(input: any) {
    this.showPassword = !this.showPassword;
    input.type = input.type === 'password' ?  'text' : 'password';
    this.inputType = input.type;
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
    } else {
      this.passwordFlag = true;
    }
  }

  login() {
    this.loading.present();

    if ((this.emailFlag === false) || (this.passwordFlag === false)) {
      let alert = this.alertCtrl.create({
        title: "Error!",
        subTitle: "Please resolve all the marked issues then submit agian."
      });

      this.loading.dismiss();
      
      alert.present();
    } else {
      this.angAuth.login(this.user).subscribe(res => {
        this.loading.dismiss();
        this.storage.set('userEmail', this.user.email);

        if (res['user'].onboarding === true) {
          this.navCtrl.setRoot('onboarding-page', { token: res['token'], user: res['user'] });
        } else {
          this.angAuth.setToken(res['token']);
          this.angUser.getUserDetails();
          this.navCtrl.setRoot(TabsPage);
        }
      }, err => {
        let alert = this.alertCtrl.create({
          title: "Login Error!",
          subTitle: err.error.message
        });
  
        this.loading.dismiss();
        
        alert.present();
      });
    }
  }

  forgetPassword() {
    this.navCtrl.push('forget-password-page');
  }

  registerPage() {
    this.navCtrl.push('signup-page');
  }

  openPrivacy() {
    const link = 'https://naturehub.com/privacy-policies.html';
    const browser = this.iab.create(link);
    browser.show();
  }
}