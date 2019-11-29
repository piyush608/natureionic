import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "src/app/models/business.model";
import { LocationService } from "src/app/services/location.service";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

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
  private user: any;
  public isBookmarked: boolean = false;
  public isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private angBusiness: BusinessService,
    private angLocation: LocationService,
    private storage: Storage,
    private angUser: UserService
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
      this.user = user;
      if (
        user.bookmarkedBusinesses.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;

      if (
        user.likedBusinesses.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isLiked = false;
      else this.isLiked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedBusinesses.push(this.business._id);
      this.update();
    } else {
      this.user.bookmarkedBusinesses.splice(
        this.user.bookmarkedBusinesses.findIndex(
          index => index === this.business._id
        ),
        1
      );
      this.update();
    }
    this.isBookmarked = !this.isBookmarked;
  }

  like() {
    if (this.isLiked === false) {
      this.user.likedBusinesses.push(this.business._id);
      this.business.likes += 1;
      this.update();
      this.updateBusiness();
    } else {
      this.user.likedBusinesses.splice(
        this.user.likedBusinesses.findIndex(
          index => index === this.business._id
        ),
        1
      );
      this.business.likes -= 1;
      this.update();
      this.updateBusiness();
    }
    this.isLiked = !this.isLiked;
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.angUser.setUser(this.user);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateBusiness() {
    this.angBusiness.update(this.business._id, this.business).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
