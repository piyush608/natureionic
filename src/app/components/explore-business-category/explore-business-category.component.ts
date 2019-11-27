import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { BusinessService } from "src/app/services/business.service";
import { LocationService } from "src/app/services/location.service";
import { MapsAPILoader } from "@agm/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-explore-business-category",
  templateUrl: "./explore-business-category.component.html",
  styleUrls: ["./explore-business-category.component.scss"]
})
export class ExploreBusinessCategoryComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public category: any;
  public city: string;
  public state: string;
  public place: any;
  public businesses = [];

  constructor(
    private angCategory: CategoryService,
    private angBusiness: BusinessService,
    private angLocation: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.angCategory.getDetails(this.route.snapshot.params.cat).subscribe(
      res => {
        this.category = res["category"];
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
    this.angBusiness
      .getCategoryBusinesses(this.city, this.route.snapshot.params.cat, "0")
      .subscribe(
        resp => {
          resp["businesses"].forEach(businesses => {
            this.businesses.push(businesses);
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}
