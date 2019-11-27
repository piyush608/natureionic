import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { BusinessService } from "src/app/services/business.service";
import { LocationService } from "src/app/services/location.service";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-explore-business",
  templateUrl: "./explore-business.component.html",
  styleUrls: ["./explore-business.component.scss"]
})
export class ExploreBusinessComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public categories = [];
  public businesses = [];
  public city: string;
  public state: string;
  public place: any;

  constructor(
    private angCategory: CategoryService,
    private angBusiness: BusinessService,
    private angLocation: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("business").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );

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
    this.angLocation.getPosition().then(res => {
      this.getLatLngCode(res._lat, res._long);
    });
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        console.log(location);
        this.city = location.city;
        this.state = location.stateSN;
        this.place = this.city + ", " + this.state;

        this.getBusinesses();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBusinesses() {
    this.categories.forEach(category => {
      this.angBusiness
        .getCategoryBusinesses(this.city, category._id, "0")
        .subscribe(
          resp => {
            console.log(resp);
            resp["businesses"].forEach(businesses => {
              this.businesses.push(businesses);
            });
          },
          err => {
            console.log(err);
          }
        );
    });
  }
}
