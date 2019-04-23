import { AlertController, Platform } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { LoadingController, NavController } from "ionic-angular";
import { Component, Input } from "@angular/core";
import { Diagnostic } from "@ionic-native/diagnostic";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TabsPage } from '../../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  selector: "current-location",
  templateUrl: "current-location.html"
})
export class CurrentLocationComponent {
  @Input("text") text: any;
  @Input("page") page: any;
  @Input("param") param: any;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private geoLocation: Geolocation,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    public platform: Platform,
    private storage: Storage
  ) {}

  currentLocation() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loading.present();
    if (this.platform.is('android')) {
      this.diagnostic.isGpsLocationEnabled().then(enabled => {
        if (enabled === true) {
          this.geoLocation.getCurrentPosition().then(res => {
            this.storage.set("location", {
              _lat: res.coords.latitude,
              _long: res.coords.longitude
            });
            loading.dismiss();
            if (this.page === "home") this.navCtrl.setRoot(TabsPage);
            else if (this.page === "search") this.navCtrl.setRoot("search-page");
            else if (this.page === "explore-business") this.navCtrl.setRoot("explore-business-page");
            else if (this.page === "result") this.navCtrl.setRoot("result-page", { query: this.param });
            else if (this.page === "result-business") this.navCtrl.setRoot("result-business-page", { business: this.param });
          }).catch(err => {
            console.log(err);
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "There is a server problem. Please try to search your location.",
              buttons: ["Dismiss"]
            });
            alert.present();
          });
        } else {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            this.geoLocation.getCurrentPosition().then(res => {
              this.storage.set("location", {
                _lat: res.coords.latitude,
                _long: res.coords.longitude
              });
              loading.dismiss();
              if (this.page === "home") this.navCtrl.setRoot(TabsPage);
              else if (this.page === "search") this.navCtrl.setRoot("search-page");
              else if (this.page === "explore-business") this.navCtrl.setRoot("explore-business-page");
              else if (this.page === "result") this.navCtrl.setRoot("result-page", { query: this.param });
              else if (this.page === "result-business") this.navCtrl.setRoot("result-business-page", { business: this.param });
            })
            .catch(err => {
              console.log(err);
              loading.dismiss();
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "There is a server problem. Please try to search your location.",
                buttons: ["Dismiss"]
              });
              alert.present();
            });
          }).catch(error => {
            loading.dismiss();
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "It seems you turned off your location service. Please turn on your location from settings and restart the application.",
                buttons: ["Dismiss"]
              });
              alert.present();
          });
        }
      }).catch(err => {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "There is a problem with your GPS Location service. Please check your phone settings and restart the application.",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
    } else if (this.platform.is('ios')) {
      this.geoLocation.getCurrentPosition().then(res => {
        this.storage.set("location", {
          _lat: res.coords.latitude,
          _long: res.coords.longitude
        });
        loading.dismiss();
        if (this.page === "home") this.navCtrl.setRoot(TabsPage);
        else if (this.page === "search") this.navCtrl.setRoot("search-page");
        else if (this.page === "explore-business") this.navCtrl.setRoot("explore-business-page");
        else if (this.page === "result") this.navCtrl.setRoot("result-page", { query: this.param });
        else if (this.page === "result-business") this.navCtrl.setRoot("result-business-page", { business: this.param });
      })
      .catch(err => {
        console.log(err);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "There is a server problem. Please try to search your location.",
          buttons: ["Dismiss"]
        });
        alert.present();
      });
    }
  }
}