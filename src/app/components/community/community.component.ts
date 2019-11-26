import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { Router } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { MapsAPILoader } from "@agm/core";
import { GroupService } from "src/app/services/group.service";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;
  public city: string;
  public state: string;
  public country: string;
  public place: string;
  public randomForums = [];
  public latestForums = [];
  public groups = [];

  constructor(
    private angForum: ForumService,
    private router: Router,
    private angLocation: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private angGroup: GroupService
  ) {}

  ngOnInit() {
    this.getCurrentPosition();

    this.angForum.getRandom().subscribe(
      res => {
        this.randomForums = res["forums"];
      },
      err => {
        console.log(err);
      }
    );

    this.angForum.getLatest().subscribe(
      res => {
        this.latestForums = res["forums"];
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
        this.country = location.country;
        this.place = this.city + ", " + this.state;

        this.getGrpoups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getGrpoups() {
    this.angGroup.getCityGroups(this.city).subscribe(
      res => {
        console.log(res);
        this.groups = res["groups"];
      },
      err => {
        console.log(err);
      }
    );
  }

  addForum() {
    this.router.navigateByUrl("/add/forum");
  }

  addGroup() {
    this.router.navigateByUrl("/add/group");
  }

  exploreGroup() {
    this.router.navigateByUrl("/explore/group");
  }

  exploreForum(type) {
    this.router.navigateByUrl("/explore/forum/" + type);
  }
}
