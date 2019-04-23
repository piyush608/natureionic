import { UserProvider } from "./../../providers/user/user";
import {
  LoadingController,
  AlertController,
  ModalController
} from "ionic-angular";
import { AuthProvider } from "./../../providers/auth/auth";
import { FireProvider } from "./../../providers/fire/fire";
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { UploadImageProvider } from "../../providers/upload-image/upload-image";
import { User } from "../../models/user.model";
import { LocationProvider } from "../../providers/location/location";
import { Storage } from "@ionic/storage";
import dataUriToBuffer from "data-uri-to-buffer";

@IonicPage({
  name: "edit-profile-page",
  segment: "edit-profile"
})
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  public user = new User();
  public currentUser: any;
  public imageFlag: boolean = false;
  public imgURL: string;
  blobImage;
  profileValid: boolean = true;
  options: CameraOptions;
  option: boolean = false;
  imageSelect;
  loader;
  public tabsElement: any;
  public clicked: boolean = false;

  public nameFlag: boolean = true;
  public nameText = "Name is required";
  public zipcodeFlag: boolean = true;
  public zipcodeText = "Zipcode is required";
  public openGal;

  constructor(
    public navCtrl: NavController,
    public angFire: FireProvider,
    public auth: AuthProvider,
    public uploadImage: UploadImageProvider,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private angUser: UserProvider,
    public modalCtrl: ModalController,
    private angLocation: LocationProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    
    this.storage.get("userData").then(snapshot => {
      this.currentUser = snapshot._id;
      this.user = snapshot as User;

      if (snapshot.photo) this.imgURL = snapshot.photo.thumb400Url;
      else this.imgURL = "assets/imgs/defaultUser.png";
    });

    this.loader = this.loadingCtrl.create({
      content: "Please wait"
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    // if(this.clicked === false) this.angUser.getUserDetails(this.currentUser);
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  nameCheck() {
    if (this.user.name.length > 0) {
      if (
        this.user.name.split(" ").filter(function(n) {
          return n != "";
        }).length === 0
      ) {
        this.nameFlag = false;
        this.nameText = "Must contain atleast 2 characters";
      } else {
        this.nameFlag = true;
      }
    } else {
      this.nameFlag = false;
      this.nameText = "Name is required";
    }
  }

  zipcodeCheck() {
    if (this.user.zipcode.length > 0) {
      if (
        this.user.zipcode.split(" ").filter(function(n) {
          return n != "";
        }).length === 0
      ) {
        this.zipcodeFlag = false;
        this.zipcodeText = "Must contain 5 digits";
      } else {
        this.zipcodeFlag = true;
      }
    } else {
      this.zipcodeFlag = false;
      this.zipcodeText = "Zipcode is required";
    }
  }

  // Redirect to Profile page
  prevStep() {
    if (this.clicked === false) this.angUser.getUserDetails();
    this.navCtrl.pop();
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

  nextStep() {
    if (this.user && this.user.name && this.user.zipcode) {
      this.editUserDetails();
    } else {
      if (!this.user.name) this.nameFlag = false;
      if (!this.user.zipcode) this.zipcodeFlag = false;
    }
  }

  editUserDetails() {
    this.clicked = true;
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    // this.storage.remove("userLocation");
    this.angUser.updateUserDetails(this.user, this.user._id).subscribe(
      res => {
        // this.storage.get("location").catch(() => {
        //   this.angLocation.getLatLngFromZipcode(this.user.zipcode).then(data => {
        //     this.storage.set("location", {
        //       _lat: data.lat,
        //       _long: data.lng
        //     });
        //   });
        // });

        if (this.imageFlag === true) {
          this.uploadImage.uploadUserImage(this.user._id, this.blobImage);
          this.user.photo = { thumb400Url: this.imgURL };
          this.storage.set("userData", this.user);
          loader.dismiss();
          this.navCtrl.setRoot("profile-page");
        } else {
          this.storage.set("userData", this.user);
          loader.dismiss();
          this.navCtrl.setRoot("profile-page");
        }
      },
      err => {
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: ["Ok"]
        });
        loader.dismiss();
        alert.present();
      }
    );
  }
}
