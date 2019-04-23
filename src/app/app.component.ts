import { AuthProvider } from './../providers/auth/auth';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Component, ViewChild, OnInit } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Geolocation } from '@ionic-native/geolocation';
import { UserProvider } from "./../providers/user/user";
import { Diagnostic } from '@ionic-native/diagnostic';
import { FireProvider } from "../providers/fire/fire";
import { StatusBar } from "@ionic-native/status-bar";
import { Subscription } from 'rxjs/Subscription';
import { Platform } from "ionic-angular";
import { Nav } from "ionic-angular";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from "@ionic/storage";
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnInit {
  @ViewChild("mainNav") mainNav: Nav;
  
  ifExists$: Subscription;
  connection: any;
  disconnection: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private angUser: UserProvider,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private locationAccuracy: LocationAccuracy,
    private angFire: FireProvider,
    private screenOrientation: ScreenOrientation,
    private angAuth: AuthProvider
  ) {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();
      if (this.platform.is('tablet') || this.platform.is('ipad')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
      } else if (this.platform.is('ios') || this.platform.is('mobile')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }

      // Check for current location
      if (this.platform.is('android')) {
        this.diagnostic.isGpsLocationEnabled().then(enabled => {
          if (enabled === true) {
            this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(res => {
              this.storage.set('location', { '_lat': res.coords.latitude, '_long': res.coords.longitude });
            }).catch(err => {
              console.log(JSON.stringify(err));
            });
          } else {
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
              this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(res => {
                this.storage.set('location', { '_lat': res.coords.latitude, '_long': res.coords.longitude });
              }).catch(err => {
                console.log(JSON.stringify(err));
              });
            }).catch(err => {
              console.log(JSON.stringify(err));
            });
          }
        });
      } else if (this.platform.is('ios')) {
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(res => {
          this.storage.set('location', { '_lat': res.coords.latitude, '_long': res.coords.longitude });
        }).catch(err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  ngOnInit() {
    this.angFire.getPoints().subscribe(data => {
      this.storage.set('pointSystems', data);
    }, err => {
      console.log(JSON.stringify(err));
    });

    if (this.angAuth.isLoggedIn()) {
      this.angUser.getUserDetails();
      this.mainNav.setRoot(TabsPage);
    } else {
      this.storage.get("intro").then(done => {
        if (!done) this.mainNav.setRoot('intro-page');
        else this.mainNav.setRoot('login-page');
      });
    }
  }
}