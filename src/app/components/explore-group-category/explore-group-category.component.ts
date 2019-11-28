import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { MapsAPILoader } from "@agm/core";
import { GroupService } from "src/app/services/group.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-explore-group-category",
  templateUrl: "./explore-group-category.component.html",
  styleUrls: ["./explore-group-category.component.scss"]
})
export class ExploreGroupCategoryComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public category: any;
  public groups = [];
  public city: string;
  public state: string;
  public place: any;
  public skip: number = 0;

  constructor(
    private angCategory: CategoryService,
    private angGroup: GroupService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private angLocation: LocationService,
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

        this.getGrpoups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGrpoups() {
    this.angGroup
      .getCategoryGroups(this.route.snapshot.params.cat, this.city, this.skip)
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
  }
}
