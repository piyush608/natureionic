import { IonicPage, NavController, LoadingController, AlertController, ModalController, NavParams} from "ionic-angular";
import { UploadImageProvider } from "../../providers/upload-image/upload-image";
import { LocationProvider } from '../../providers/location/location';
import { UserProvider } from "./../../providers/user/user";
import { User } from '../../models/user.model';
import { Camera } from "@ionic-native/camera";
import { Component } from "@angular/core";
import { TabsPage } from "./../tabs/tabs";
import { AuthProvider } from '../../providers/auth/auth';
import dataUriToBuffer from "data-uri-to-buffer";
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "onboarding-page",
  segment: "onboarding"
})
@Component({
  selector: "page-on-boarding",
  templateUrl: "on-boarding.html"
})
export class OnBoardingPage {
  public user = new User();
  public tabsElement: any;
  
  public imgURL: any = "assets/imgs/defaultUser.png";
  
  options;
  imageSelect;

  imageFlag;
  blobImage;
  flag: boolean = true;
  
  buttonClick: boolean = false;
  
  message: string;

  public nameFlag: boolean = true;
  public nameText = 'Name is required';
  public zipcodeFlag: boolean = true;
  public zipcodeText = 'Zipcode is required';

  constructor(
    public navCtrl: NavController,
    private angUser: UserProvider,
    private uploadImage: UploadImageProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private angLocation: LocationProvider,
    public modalCtrl: ModalController,
    private angAuth: AuthProvider,
    private navParamas: NavParams,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  presentModal() {
    let optionModal = this.modalCtrl.create("camera-option-page", { 'limit': true });

    optionModal.present();
    optionModal.onWillDismiss(data => {
      if (data.flag !== false) {
        this.imageFlag = true;
        this.imgURL = data.image;
        this.blobImage = data.blob;
      } else {
        if (data.limit === true) {
          const alert = this.alertCtrl.create({
            title: 'Image Error',
            subTitle: 'Please try to select image under 2 MB',
            buttons: ['OK']
          });
          alert.present();
        }
      }
    });
  }

  nameCheck() {
    if (this.user.name.length > 0) {
      if (this.user.name.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.nameFlag = false;
        this.nameText = 'Must contain atleast 2 characters';
      } else {
        this.nameFlag = true;
      }
    } else {
      this.nameFlag = false;
      this.nameText = 'Name is required';
    }
  }

  zipcodeCheck() {
    if (this.user.zipcode.length > 0) {
      if (this.user.zipcode.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.zipcodeFlag = false;
        this.zipcodeText = 'Must contain 5 digits';
      } else {
        this.zipcodeFlag = true;
      }
    } else {
      this.zipcodeFlag = false;
      this.zipcodeText = 'Zipcode is required';
    }
  }

  nextPage() {
    if (this.user && this.user.name && this.user.zipcode) {
      if (this.user.name.length > 0 && this.user.zipcode.length === 5) {
        this.submit();
      } else {
        if (this.user.name.length < 2) {
          this.nameFlag = false;
          this.nameText = 'Name is required and atleast 2 characters long';
        }
  
        if (this.user.zipcode.length !== 5) {
          this.zipcodeFlag = false;
          this.zipcodeText = 'Zipcode is required and 5 digit long';
        }
      }
    } else {
      this.nameFlag = false;
      this.zipcodeFlag = false;
    }
  }

  submit() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.user.onboarding = false;
    this.angAuth.setToken(this.navParamas.get('token'));
    this.angUser.updateUserDetails(this.user, this.navParamas.get('user')._id).subscribe(success => {
      this.storage.get('location').catch(() => {
        this.angLocation.getLatLngFromZipcode(this.user.zipcode).then(data => {
          this.storage.set('location', { '_lat': data.lat, '_long': data.lng });
        });
      });

      if (this.imageFlag === true) {
        loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
        this.uploadImage.uploadUserImage(this.navParamas.get('user')._id, this.blobImage);
        this.user.photo = { thumb400Url: this.imgURL};
        this.storage.set('userData', this.user);
      } else {
        loader.dismiss();
        this.user.points = 0;
        this.storage.set('userData', this.user);
        this.navCtrl.setRoot(TabsPage);
      }
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Ok']
      });
      loader.dismiss();
      alert.present();
    });
  }
}