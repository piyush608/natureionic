import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import dataUriToBuffer from "data-uri-to-buffer";

@IonicPage({
  name: 'camera-option-page',
  segment: 'camera-option'
})
@Component({
  selector: 'page-camera-option',
  templateUrl: 'camera-option.html',
})
export class CameraOptionPage {
  public flag: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    private platform: Platform,
    private camera: Camera,
  ) {
    if (this.platform.is('tablet') || this.platform.is('ipad')) {
      this.flag = true;
    }
    
    this.platform.registerBackButtonAction(() => {
      this.closeModal();
    });
  }

  ionViewDidLoad() {
    if(!this.navParams.get('flag')) document.getElementsByClassName("options")[0].setAttribute("style","opacity:1;")
    if (this.navParams.get('flag') === 'camera') this.openCamera();
    else if (this.navParams.get('flag') === 'gallery') this.openGallery();
  }

  openCamera() {
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imageData => {
      const image = "data:image/jpeg;base64," + imageData;
      const blobImage = dataUriToBuffer(image);
      this.viewCtrl.dismiss({ image: image, blob: blobImage, flag: 'camera' });
    });
  }

  openGallery() {
    document.getElementById("fileInput").click();
  }

  onImageLoad(e) {
    if ((this.navParams.get('limit') === true) && (e.target.files[0].size > 2097152)) {
      this.viewCtrl.dismiss({ flag: false, limit: true });
    } else {
      const blobImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = e.target.result;
        this.viewCtrl.dismiss({ image: image, blob: blobImage, flag: 'gallery' });
      };
  
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss({ flag: false });
  }
}
