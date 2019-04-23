import { LocationProvider } from "../../providers/location/location";
import { FireProvider } from "../../providers/fire/fire";
import { Geolocation } from "@ionic-native/geolocation";
import { Component, NgZone, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Platform, AlertController, Slides, ToastController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadImageProvider } from "../../providers/upload-image/upload-image";
import { AuthProvider } from "../../providers/auth/auth";
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from "rxjs/Subscription";
import { BusinessProvider } from "../../providers/business/business";
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, LatLng } from "@ionic-native/google-maps";
import { Business } from '../../models/business.model';
import { BookmarkProvider } from '../../providers/bookmark/bookmark';
import { LikeProvider } from '../../providers/like/like';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { CategoryProvider } from '../../providers/category/category';
import { UserProvider } from '../../providers/user/user';
import { Storage } from "@ionic/storage";

@IonicPage({
  name: "add-business-page",
  segment: "add-business"
})
@Component({
  selector: "page-add-business",
  templateUrl: "add-business.html"
})
export class AddBusinessPage {
  // All variabels
  @ViewChild(Slides) slides: Slides;
  public businessCategories: any;

  // Boolean variables
  public liked: boolean;
  
  // Object variables
  private isLiked: {
    id: string,
    flag: boolean
  };
  private isBookmarked: {
    id: string,
    flag: boolean;
  }

  // Validation variables
  nameFlag: boolean = true;
  nameText: string = 'Name is required';
  categoryFlag: boolean = true;
  categoryText: string = 'Category is required';
  numberFlag: boolean = true;
  numberText: string = 'Phone number is required';
  locationFlag: boolean = true;
  locationText: string = 'Location is required';
  emailFlag: boolean = true;
  emailText: string = 'Wrong email format';

  // Two-way binding
  public business = new Business();
  public newBusiness: any;

  private map: GoogleMap;
  public uid: any;
  public userPoints: any;
  public addPoints: any;
  public addBusinessPoints: any;
  public points$: Subscription;
  public userPoints$: Subscription;
  public userLocation$: Subscription;
  public lat: number;
  public lng: number;
  public zoom: number;
  public tabsElement: any;
  public image = [];
  public img = [];
  public firstButtonClicked: boolean = false;
  public secondButtonClicked: boolean = false;
  public thirdButtonClicked: boolean = false;
  public stepCount: number = 0;
  public firstFormValid: boolean = true;
  @ViewChild("search") public searchElementRef;
  public mapMarker: string;
  private flag: boolean = false;
  public searchTxt;
  imageSelect;
  imageFlag: boolean = false;
  businessLikePoints;
  businessDislikePoints;
  options: CameraOptions;
  imageValid: boolean = true;
  cameraOption: boolean = false;
  businessCategory: string;

  public switchFlag: boolean = false;
  public mapImage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public uploadImage: UploadImageProvider,
    public angFireAuth: AuthProvider,
    public angFire: FireProvider,
    private loadingCtrl: LoadingController,
    private angLocation: LocationProvider,
    private alertCtrl: AlertController,
    private ngZone: NgZone,
    private angBusiness: BusinessProvider,
    private camera: Camera,
    public modalCtrl: ModalController,
    private platform: Platform,
    private _DomSanitizationService: DomSanitizer,
    private angBookmark: BookmarkProvider,
    private toastCtrl: ToastController,
    public angLike: LikeProvider,
    private callNumber: CallNumber,
    private launchNavigator: LaunchNavigator,
    private angCategory: CategoryProvider,
    private angUser: UserProvider,
    private storage: Storage
  ) {
    this.tabsElement = document.querySelector(".tabbar.show-tabbar");

    this.storage.get('userData').then(user => {
      this.uid = user._id;
      this.userPoints = user.points;
    });
  }

  ngOnInit() {
    this.angCategory.getBusinessCategories().subscribe(res => {
      this.businessCategories = res;
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  ionViewDidLoad() {
    if (this.tabsElement) this.tabsElement.style.display = "none";
    this.getUserLocation();
    this.platform.registerBackButtonAction(() => {
      this.prevStep();
    });
  }

  ionViewWillEnter() {
    this.tabsElement.style.display = "none";
  }

  ionViewWillLeave() {
    if (this.tabsElement) this.tabsElement.style.display = "flex";

    if (this.isLiked) {
      if (this.liked !== this.isLiked.flag) {
        this.storage.get('userData').then(user => {
          this.angLike.likeBusiness(this.business._id, user._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        });
      }
    }
  }

  checkName() {
    if (this.business.name.length > 0) {
      if (this.business.name.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.nameFlag = false;
        this.nameText = 'Must contain atleast one character';
      } else {
        this.nameFlag = true;
      }
    } else {
      this.nameFlag = false;
      this.nameText = 'Name is required';
    }
  }

  checkNumber() {
    var reg = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

    if (reg.test(this.business.phone) === false) {
      this.numberFlag = false;
      this.numberText = 'Supported pattern is (XXX) XXX-XXXX';
    } else {
      this.numberFlag = true;
    }
  }

  checkEmail() {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(this.business.email) === false) {
      this.emailFlag = false;
    } else {
      this.emailFlag = true;
    }

    if (this.business.email.length === 0) {
      this.emailFlag = true;
    }
  }

  checkLocation() {
    if (this.business.address.length >= 5) {
      if (this.business.address.split(' ').filter(function (n) { return n != '' }).length === 0) {
        this.locationFlag = false;
        this.locationText = 'Must contain atleast 5 characters';
      } else {
        if (this.business.address.trim().length >= 5) {
          this.locationFlag = true;
        } else {
          this.locationFlag = false;
          this.locationText = 'Must contain atleast 5 characters';
        }
      }
    } else {
      this.locationFlag = false;
      this.locationText = 'Location is required and must be atleast 5 characters long';
    }
  }

  getCurrentPosition() {
    this.storage.get('location').then(resp => {
      this.lat = resp._lat;
      this.lng = resp._long;
      this.map.clear();
      let nativeHomeInputBox = document.getElementById("txtHome").getElementsByTagName("input")[0];
      nativeHomeInputBox.value = "";

      this.map.addMarker({
        title: "You are here",
        icon: "assets/imgs/locationIcon.png",
        animation: "DROP",
        position: {
          lat: this.lat,
          lng: this.lng
        },
        draggable: true
      }).then((marker: Marker) => {
        this.map.animateCamera({
          target: marker.getPosition(),
          zoom: 16
        });

        this.map.addEventListener(GoogleMapsEvent.MAP_DRAG).subscribe(() => {
          marker.setPosition(this.map.getCameraTarget());
        });
        this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          this.lat = marker.getPosition().lat;
          this.lng = marker.getPosition().lng;
          var latlng = new LatLng(this.lat, this.lng);
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: latlng }, function (results, status) {
            marker.setTitle(results[0].formatted_address);
            nativeHomeInputBox.value = results[0].formatted_address;
          });
        });
      });
    }).catch(() => {
      this.geolocation.getCurrentPosition().then(resp => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;

        this.map.clear();
        let nativeHomeInputBox = document.getElementById("txtHome").getElementsByTagName("input")[0];
        nativeHomeInputBox.value = "";

        this.map.addMarker({
          title: "You are here",
          icon: "assets/imgs/locationIcon.png",
          animation: "DROP",
          position: {
            lat: this.lat,
            lng: this.lng
          },
          draggable: true
        }).then((marker: Marker) => {
          this.map.animateCamera({
            target: marker.getPosition(),
            zoom: 16
          });

          this.map.addEventListener(GoogleMapsEvent.MAP_DRAG).subscribe(() => {
            marker.setPosition(this.map.getCameraTarget());
            marker.hideInfoWindow();
          });
          this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
            this.lat = marker.getPosition().lat;
            this.lng = marker.getPosition().lng;
            var latlng = new LatLng(this.lat, this.lng);
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, function (results, status) {
              marker.setTitle(results[0].formatted_address);
              nativeHomeInputBox.value = results[0].formatted_address;
            });
          });
        });
      });
    });
  }

  getUserLocation() {
    this.storage.get('location').then(res => {
      this.lat = parseFloat(res._lat);
      this.lng = parseFloat(res._long);
      this.zoom = 17;
      this.mapMarker = "You are here";
    }).catch(() => {
      this.storage.get('userData').then(user => {
        this.angLocation.getLatLngFromZipcode(user.zipcode).then(data => {
          this.lat = parseFloat(data.lat);
          this.lng = parseFloat(data.lng);
          this.zoom = 17;
          this.mapMarker = "You are here";
        });
      });
    });
  }

  presentModal() {
    let optionModal = this.modalCtrl.create("camera-option-page", { flag: this.imageSelect });

    optionModal.present();
    optionModal.onWillDismiss(data => {
      if (data.flag !== false) {
        this.imageSelect = data.flag;
        this.flag = true;
        this.image.push(data.image);
        this.img.push(data.blob);
      }
    });
  }

  sanitize(url) {
    return this._DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  deleteImage(key) {
    let loader = this.loadingCtrl.create({
      content: "Please wait"
    });
    loader.present();
    this.image.splice(key, 1);
    this.img.splice(key, 1);
    if(this.image.length == 0 && this.img.length ==0){
      this.flag = false;
      this.imageSelect = null;
      this.cameraOption = false;
    }
    loader.dismiss();
  }

  addBusiness() {
    let profileModal = this.modalCtrl.create('business-modal-page');
    profileModal.present();

    const location = {
      _lat: this.lat,
      _long: this.lng
    };

    this.angLocation.getLocation(this.lat, this.lng).then(data => {
      this.business.location = location;
      this.business.addedBy = this.uid;
      this.business.city = data.city;
      this.business.state = data.state;
      this.business.status = 'pending';
      this.angBusiness.addBusiness(this.business).subscribe(business => {
        this.business._id = business['business']._id;
        this.business.likes = business['business'].likes;

        // Call image-upload function to upload images of business
        this.addBusinessImages();
        this.loadeStaticMap();
      });
    });

  }

  addBusinessImages() {
    this.img.forEach((image, index) => {
      this.uploadImage.uploadBusinessImages(this.business._id, image);
    });
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
    let title = "You are here";

    var geocoder = new google.maps.Geocoder();
    var latlng = new LatLng(this.lat, this.lng);
    geocoder.geocode({ location: latlng }, function (results, status) {
      title = results[0].formatted_address;
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.addMarker({
        title: title,
        icon: "assets/imgs/locationIcon.png",
        animation: "DROP",
        position: {
          lat: this.lat,
          lng: this.lng
        },
        draggable: true,
      }).then((marker: Marker) => {
        this.map.addEventListener(GoogleMapsEvent.MAP_DRAG).subscribe(() => {
          marker.setPosition(this.map.getCameraTarget());
          marker.hideInfoWindow();
        });
        this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
          this.lat = marker.getPosition().lat;
          this.lng = marker.getPosition().lng;
          var geocoder = new google.maps.Geocoder();
          var latlng = new LatLng(this.lat, this.lng);
          geocoder.geocode({ location: latlng }, function (results, status) {
            marker.setTitle(results[0].formatted_address);
            if (nativeHomeInputBox.value != "") {
              nativeHomeInputBox.value = results[0].formatted_address;
            }
          });
        });
      });

      let defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(this.lat, this.lng)
      );

      let nativeHomeInputBox = document.getElementById("txtHome").getElementsByTagName("input")[0];

      let autocomplete = new google.maps.places.Autocomplete(
        nativeHomeInputBox,
        {
          types: ["establishment"],
          bounds: defaultBounds
        }
      );

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.searchTxt = place.name.toString();

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 16;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.map.clear();

          // Now you can use all methods safely.
          this.map.addMarker({
            title: place.name.toString(),
            icon: "assets/imgs/locationIcon.png",
            animation: "DROP",
            position: {
              lat: this.lat,
              lng: this.lng
            },
            draggable: true
          }).then((marker: Marker) => {
            this.map.animateCamera({
              target: marker.getPosition(),
              zoom: 16
            });

            this.map.addEventListener(GoogleMapsEvent.MAP_DRAG).subscribe(() => {
              marker.setPosition(this.map.getCameraTarget());
              marker.hideInfoWindow();
            });
            this.map.addEventListener(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
              this.lat = marker.getPosition().lat;
              this.lng = marker.getPosition().lng;
              var latlng = new LatLng(this.lat, this.lng);
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({ location: latlng }, function (results, status) {
                marker.setTitle(results[0].formatted_address);
                nativeHomeInputBox.value = results[0].formatted_address;
              });
            });
          });
        });
      });
    });
  }

  loadeStaticMap() {
    let toast = this.toastCtrl.create({
      message: 'Note: Your business needs approval before it shows up in Search results',
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom'
    });
    toast.present();

    this.liked = false;
    this.isLiked = { id: null, flag: false };
    this.isBookmarked = { id: null, flag: false };

    setInterval(() => {
      this.switchFlag = true;
    }, 1500);

    this.mapImage = "http://maps.google.com/maps/api/staticmap?center=" + this.lat + "," + this.lng + "&markers=size:small|" + this.lat + "," + this.lng + "&zoom=15&size=312x312&key=AIzaSyDgsEC3C4fI6Otn-LJLs2SzySnYp91hHQU";

    this.businessCategories.map(d => {
      if (d._id === this.business.category) {
        this.businessCategory = d.name;
      }
    });
  }

  selectCategory() {
    if (this.business.category) {
      this.categoryFlag = true;
    } else {
      this.categoryFlag = false;
    }
  }

  like() {
    var count = document.getElementById('count').innerHTML;
    if (this.isLiked.flag === true) {
      var newCount = parseInt(count) - 1;
      document.getElementById('count').innerHTML = newCount.toString();
      this.isLiked.flag = !this.isLiked.flag;
    } else {
      var newCounts = parseInt(count) + 1;
      document.getElementById('count').innerHTML = newCounts.toString();
      this.isLiked.flag = !this.isLiked.flag;
    }
  }

  bookmark() {
    this.storage.get('userData').then(user => {
      if (this.isBookmarked.flag === true) {
        var businessSchema = {
          _id: this.isBookmarked.id,
          businessId: this.business._id
        };

        this.angBookmark.debookmarkBusiness(user._id, businessSchema).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business removed from collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      } else {
        this.angBookmark.bookmarkBusiness(this.business._id, user._id).subscribe(res => {
          this.isBookmarked.flag = !this.isBookmarked.flag;
          let toast = this.toastCtrl.create({
            message: 'Business saved to collection',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          this.angUser.getUserBusinessBookmarksList();
          this.angBookmark.getBookmarkedBusinesses();
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  call() {
    this.callNumber.callNumber(this.business.phone.toString(), true);
  }

  getDirection() {
    this.launchNavigator.availableApps().then(data => {
      if (data["google_maps"] === true) {
        let options: LaunchNavigatorOptions = {
          app: this.launchNavigator.APP.GOOGLE_MAPS
        };

        this.launchNavigator.navigate([this.lat, this.lng], options).then(
          success => console.log("Launched navigator", success),
          error => console.log("Error launching navigator", error)
        );
      } else if (data["apple_maps"] === true) {
        let options: LaunchNavigatorOptions = {
          app: this.launchNavigator.APP.APPLE_MAPS
        };

        this.launchNavigator.navigate([this.lat, this.lng], options).then(
          success => console.log("Launched navigator", success),
          error => console.log("Error launching navigator", error)
        );
      }
    });
  }

  openSlider(key) {
    this.slides.slideTo(key, 500);
  }

  nextStep() {
    this.stepCount += 1;
    if (this.stepCount === 1) {
      if (this.nameFlag === true && this.categoryFlag === true && this.numberFlag === true && this.emailFlag === true && this.locationFlag === true) {
        if (this.business.name && this.business.category && this.business.address && this.emailFlag === true && this.business.phone) {
          this.firstButtonClicked = !this.firstButtonClicked;
          this.loadMap();
        } else {
          if (!this.business.name) this.nameFlag = false;
          if (!this.business.category) this.categoryFlag = false;
          if (!this.business.address) this.locationFlag = false;
          if (!this.business.phone) this.numberFlag = false;
          this.stepCount -= 1;
        }
      } else {
        this.stepCount -= 1;
      }
    }
    if (this.stepCount === 2) {
      this.secondButtonClicked = !this.secondButtonClicked;
      this.searchTxt = document.getElementById("txtHome").getElementsByTagName("input")[0].value;
    }
    if (this.stepCount === 3) {
      if (this.flag) {
        this.addBusiness();
        this.stepCount = 0;
      } else {
        this.stepCount -= 1;
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'You have to add images in order to proceed.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }
  }

  prevStep() {
    this.stepCount -= 1;
    if (this.stepCount === 1) {
      this.secondButtonClicked = !this.secondButtonClicked;
      this.loadMap();
    }
    if (this.stepCount === 0) {
      this.firstButtonClicked = !this.firstButtonClicked;
      this.searchTxt = document.getElementById("txtHome").getElementsByTagName("input")[0].value;
    }
    if (this.stepCount === -1) {
      this.navCtrl.pop();
    }
  }
}