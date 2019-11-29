import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "src/app/models/business.model";
import { LocationService } from "src/app/services/location.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-view-business",
  templateUrl: "./view-business.component.html",
  styleUrls: ["./view-business.component.scss"]
})
export class ViewBusinessComponent implements OnInit {
  public business = new Business();
  public viewedPhoto: any;
  public mapImage: any;
  public userLocation: any;
  public addedUserImage: any;
  public isBookmarked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private angBusiness: BusinessService,
    private angLocation: LocationService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.angBusiness.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.business = res["business"];
        this.viewedPhoto = this.business.photos[0].thumb400Url;
        this.mapImage =
          "http://maps.google.com/maps/api/staticmap?center=" +
          this.business.location._lat +
          "," +
          this.business.location._long +
          "&markers=size:small|" +
          this.business.location._lat +
          "," +
          this.business.location._long +
          "&zoom=15&size=312x312&key=AIzaSyDgsEC3C4fI6Otn-LJLs2SzySnYp91hHQU";

        if (this.business.addedBy.photo.length > 0) {
          this.business.addedBy.photo.forEach(photo => {
            this.addedUserImage = photo.image.thumb200Url;
          });
        } else {
          this.addedUserImage =
            "https://ui-avatars.com/api/?name=" +
            this.business.addedBy.name.split(" ").join("+");
        }

        this.angLocation
          .getLocationFromZipcode(this.business.addedBy.zipcode)
          .then(location => {
            this.userLocation = location;
          });
      },
      err => {
        console.log(err);
      }
    );

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedBusinesses.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }
}
