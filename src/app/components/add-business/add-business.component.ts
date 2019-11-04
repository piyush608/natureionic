import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";
import { Business } from "src/app/models/business.model";
import { MapsAPILoader } from "@agm/core";
import { LocationService } from "src/app/services/location.service";
import { CategoryService } from "src/app/services/category.service";
import { BusinessService } from "src/app/services/business.service";
import { ImageService } from "src/app/services/image.service";
/// <reference types=”@types/googlemaps” />
declare var google: any;

@Component({
  selector: "app-add-business",
  templateUrl: "./add-business.component.html",
  styleUrls: ["./add-business.component.scss"]
})
export class AddBusinessComponent implements OnInit {
  public business = new Business();
  public zoom = 15;
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public categories = [];
  public localFiles = [];
  public files = [];

  constructor(
    public modalController: ModalController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private angLocation: LocationService,
    private angCategory: CategoryService,
    private angBusiness: BusinessService,
    private angImage: ImageService
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.getCategories();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["establishment"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Set latitude, longitude
          this.business.location = {
            _lat: place.geometry.location.lat(),
            _long: place.geometry.location.lng()
          };

          this.getLatLngCode(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  getCurrentPosition() {
    this.angLocation.getPosition().then(res => {
      this.business.location = {
        _lat: res._lat,
        _long: res._long
      };

      this.getLatLngCode(res._lat, res._long);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent
    });
    return await modal.present();
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        this.business.city = location.city;
        this.business.state = location.state;
        this.business.country = location.country;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCategories() {
    this.angCategory.getCategories("business").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.files.push(file);

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  addBusiness() {
    this.angBusiness.addBusiness(this.business).subscribe(res => {
      this.business = res["newBusiness"];
      this.files.forEach(file => {
        this.angImage
          .uploadImage("businesses", res["newBusiness"]._id, file)
          .then(url => {
            this.getImageRef(url);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

  getImageRef(URL) {
    this.angImage.uploadImageURL(URL).subscribe(
      res => {
        this.business.photos.push(res["photo"]._id);
        const filename = res["photo"].originalUrl.split("/");
        const params = {
          path: res["photo"].originalUrl,
          key: "businesses/" + this.business._id + "/",
          filename: filename[filename.length - 1]
        };
        this.angImage.resizeImage(params).subscribe(
          resp => {
            console.log(resp);
          },
          err => {
            console.log(err);
          }
        );

        if (this.business.photos.length === this.files.length) {
          this.angBusiness.update(this.business._id, this.business).subscribe(
            () => {
              this.presentModal();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
