import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { GroupService } from "src/app/services/group.service";
import { MapsAPILoader } from "@agm/core";
import { LocationService } from "src/app/services/location.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-explore-group",
  templateUrl: "./explore-group.component.html",
  styleUrls: ["./explore-group.component.scss"]
})
export class ExploreGroupComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public categories = [];
  public groups = [];
  public city: string;
  public state: string;
  public country: string;
  public place: any;

  constructor(
    private angCategory: CategoryService,
    private angGroup: GroupService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private angLocation: LocationService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getCurrentPosition();

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

  getCurrentPosition() {
    this.storage.get("place").then(place => {
      if (place) {
        this.place = place;

        this.storage.get("city").then(city => {
          this.city = city;
          this.getGrpoups();
        });
      } else {
        this.angLocation.getPosition().then(res => {
          this.getLatLngCode(res._lat, res._long);
        });
      }
    });
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        this.city = location.city;
        this.state = location.stateSN;
        this.place = this.city + ", " + this.state;

        this.storage.set("place", this.place);
        this.storage.set("city", this.city);

        this.getGrpoups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGrpoups() {
    this.angCategory.getCategories("group").subscribe(
      res => {
        this.categories = res["categories"];

        this.categories.forEach(category => {
          this.angGroup
            .getCategoryGroups(category._id, this.city, "0")
            .subscribe(
              resp => {
                resp["groups"].forEach(groups => {
                  this.groups.push(groups);
                });
              },
              err => {
                console.log(err);
              }
            );
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  addGroup() {
    this.router.navigateByUrl("/add/group");
  }

  exploreCategory(_id) {
    this.router.navigateByUrl("/explore/group/category/" + _id);
  }
}
