import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from "@ionic-native/google-maps";
import { BusinessProvider } from '../../providers/business/business';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "result-business-map-page",
  segment: "result-business-map"
})
@Component({
  selector: "page-result-business-map",
  templateUrl: "result-business-map.html"
})
export class ResultBusinessMapPage {
  private map: GoogleMap;  
  public tabsElement: any;
  public location;
  private lat: number;
  private lng: number;
  private businesses: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private angBusiness: BusinessProvider,
    private storage: Storage
  ) {
    // Tabs controler
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");
    this.location = this.navParams.get("location");
    this.getResults();
  }

  ngOnInit() {
    this.angBusiness.getAllCityBusinesses(this.location).subscribe(res => {
      this.businesses = res;
    }, err => {
      console.log(JSON.stringify(err))
    });
  }

  ionViewWillEnter() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";
  }

  getResults() {
    // Get all businesses
    this.storage.get('location').then(res => {
      this.lat = res._lat;
      this.lng = res._long;
      this.loadMap();
    }).catch((err) => {
      this.storage.get('userData').then(data => {
        var loc: Subscription = this.location.returnState(data.zipcode).subscribe(res => {
          this.lat = parseFloat(res.places[0].latitude);
          this.lng = parseFloat(res.places[0].longitude);
          this.loadMap();
          loc.unsubscribe();
        });
      });
    });
  }

  prevStep() {
    this.navCtrl.pop();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.lat,
          lng: this.lng
        },
        zoom: 16
      },
      styles: [
        {
          stylers: [
            {
              saturation: -100
            },
            {
              gamma: 1
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.business",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.business",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.place_of_worship",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.place_of_worship",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "water",
          stylers: [
            {
              visibility: "on"
            },
            {
              saturation: 50
            },
            {
              gamma: 0
            },
            {
              hue: "#50a5d1"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#333333"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text",
          stylers: [
            {
              weight: 0.5
            },
            {
              color: "#333333"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "labels.icon",
          stylers: [
            {
              gamma: 1
            },
            {
              saturation: 50
            }
          ]
        }
      ]
    };
    this.map = GoogleMaps.create("map_canvas", mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.addMarker({
        title: "Your current location",
        icon: "assets/imgs/currentLocation.png",
        animation: "DROP",
        position: {
          lat: this.lat,
          lng: this.lng
        },
        draggable: false,
      });

      if (this.businesses) {
        this.businesses.map(bus => {
          this.map.addMarker({
            title: bus.name,
            icon: "assets/imgs/locationIcon.png",
            animation: "DROP",
            position: {
              lat: bus.location._lat,
              lng: bus.location._long
            },
            draggable: true,
            snippet: bus.address
          });
        });
      }
    });
  }
}