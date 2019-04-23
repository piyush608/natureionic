import { KeywordProvider } from './../../providers/keyword/keyword';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'location-page',
  segment: 'location'
})
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  public tabsElement: any;
  public recentSearch = [];

  constructor(
    public navCtrl: NavController,
    private ngZone: NgZone,
    private angKeyword: KeywordProvider,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
  }

  ngOnInit() {
    this.angUser.getSearchedLocations().subscribe(res => {
      this.recentSearch = res['locations'].locations;
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getLocation() {
    let nativeHomeInputBox = document.getElementById("myInput").getElementsByTagName("input")[0];

    let autocomplete = new google.maps.places.Autocomplete(
      nativeHomeInputBox,
      {
        types: ["(cities)"]
      }
    );

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.getLocationKeyword(place);

        this.storage.set('location', { '_lat': place.geometry.location.lat(), '_long': place.geometry.location.lng() });
        this.navCtrl.setRoot(HomePage);
      });
    });
  }

  getLocationKeyword(loc) {
    this.storage.get('userData').then(user => {
      if (this.recentSearch.length > 0) {
        for (var i=0; i<this.recentSearch.length; i++) {
          if (this.recentSearch[i].city === loc.name) {
            const updatedDoc = {
              _id: this.recentSearch[i]._id,
              city: this.recentSearch[i].city,
              location: {
                _lat: loc.geometry.location.lat(),
                _long: loc.geometry.location.lng()
              },
              date: Date.now()
            };

            this.updateUserLocationInfo(user._id, updatedDoc);
            break;
          }
        }

        if (i >= this.recentSearch.length) {
          const newDoc = {
            city: loc.name,
            location: {
              _lat: loc.geometry.location.lat(),
              _long: loc.geometry.location.lng()
            },
            date: new Date()
          };
  
          this.createUserLocationInfo(user._id, newDoc);
        }
      } else {
        const newDoc = {
          city: loc.name,
          location: {
            _lat: loc.geometry.location.lat(),
            _long: loc.geometry.location.lng()
          },
          date: new Date()
        };

        this.createUserLocationInfo(user._id, newDoc);
      }
    });
  }

  changeLocation(loc) {
    this.storage.set('location', { '_lat': loc.location._lat, '_long': loc.location._long }).then(() => {
      this.storage.get('userData').then(user => {
        const updatedDoc = {
          _id: loc._id,
          city: loc.city,
          location: {
            _lat: loc.location._lat,
            _long: loc.location._long
          },
          date: Date.now()
        };

        this.updateUserLocationInfo(user._id, updatedDoc);
      });
    });
  }

  updateUserLocationInfo(uid, location) {
    this.angKeyword.updatelocationKeyword(uid, location).subscribe(res => {
      this.angUser.getUserDetails();
      this.navCtrl.setRoot(HomePage);
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  createUserLocationInfo(uid, location) {
    console.log(uid);
    this.angKeyword.createLocationKeyword(uid, location).subscribe(res => {
      console.log(JSON.stringify(res));
      // this.angUser.getUserDetails();
      // this.navCtrl.setRoot(HomePage);
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  prevStep() {
    this.navCtrl.pop();
  }
}