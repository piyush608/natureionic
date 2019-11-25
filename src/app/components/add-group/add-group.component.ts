import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { Group } from "src/app/models/group.model";
import { LocationService } from "src/app/services/location.service";
import { MapsAPILoader } from "@agm/core";
import { CategoryService } from "src/app/services/category.service";
import { GroupService } from "src/app/services/group.service";
import { ImageService } from "src/app/services/image.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"]
})
export class AddGroupComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public group = new Group();
  public place: string;
  public categories = [];
  public image: any;
  public localImage: any;
  public loader: any;

  constructor(
    private angLocation: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private angCategory: CategoryService,
    private angGroup: GroupService,
    private angImage: ImageService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.getCategories();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["(cities)"]
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
          this.getLatLngCode(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  getCategories() {
    this.angCategory.getCategories("group").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );
  }

  getCurrentPosition() {
    this.angLocation.getPosition().then(res => {
      this.getLatLngCode(res._lat, res._long);
    });
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        this.group.city = location.city;
        this.group.state = location.stateSN;
        this.group.country = location.country;
        this.place = this.group.city + ", " + this.group.state;
      })
      .catch(err => {
        console.log(err);
      });
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addGroup() {
    this.presentLoading();

    this.angGroup.create(this.group).subscribe(
      res => {
        this.group = res["newGroup"];

        this.angImage
          .uploadImage("groups", res["newGroup"]._id, this.image)
          .then(url => {
            this.getImageRef(url);
          })
          .catch(err => {
            console.log(err);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageRef(URL) {
    this.angImage.uploadImageURL(URL).subscribe(
      res => {
        this.group.photos.push(res["photo"]._id);
        const filename = res["photo"].originalUrl.split("/");
        const params = {
          path: res["photo"].originalUrl,
          key: "groups/" + this.group._id + "/",
          filename: filename[filename.length - 1]
        };
        this.angImage.resizeImage(params).subscribe(
          resp => {
            this.dismissLoading();
            this.router.navigateByUrl("/view/group/" + this.group._id);
          },
          err => {
            console.log(err);
          }
        );

        this.angGroup.update(this.group._id, this.group).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: "Please wait"
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }
}
