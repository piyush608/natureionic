import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user.model";
import { LocationService } from "src/app/services/location.service";
import { LevelService } from "src/app/services/level.service";
import { Level } from "src/app/models/level.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user = new User();
  public profileImage: string;
  public tab: string = "collection";
  public location: any;
  public level = new Level();

  constructor(
    private router: Router,
    private angUser: UserService,
    private angLocation: LocationService,
    private angLevel: LevelService
  ) {}

  ngOnInit() {
    this.angUser.getProfile().subscribe(
      res => {
        console.log(res);
        this.user = res["user"];

        if (res["user"].photo.length > 0) {
          res["user"].photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.profileImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.profileImage =
            "https://ui-avatars.com/api/?name=" +
            res["user"].name.split(" ").join("+");
        }

        this.angLocation
          .getLocationFromZipcode(this.user.zipcode)
          .then(location => {
            this.location = location;
          })
          .catch(err => {
            console.log(err);
          });

        this.angLevel.getUserLevel(this.user.points).subscribe(
          res => {
            this.level = res["level"];
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

  openEditProfile() {
    this.router.navigateByUrl("/edit-profile");
  }

  openFollowers() {
    this.router.navigateByUrl("/connection");
  }

  changeTab(value) {
    this.tab = value;
  }
}
