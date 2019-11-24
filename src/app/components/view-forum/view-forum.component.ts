import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { ActivatedRoute } from "@angular/router";
import { Forum } from "src/app/models/forum.model";
import { LocationService } from "src/app/services/location.service";
import { LocalService } from "src/app/services/local.service";

@Component({
  selector: "app-view-forum",
  templateUrl: "./view-forum.component.html",
  styleUrls: ["./view-forum.component.scss"]
})
export class ViewForumComponent implements OnInit {
  public forum = new Forum();
  public addedUserImage: string;
  public viewedPhoto: string;
  public userLocation: any;
  public publishedTime: any;

  constructor(
    private angForum: ForumService,
    private route: ActivatedRoute,
    private angLocation: LocationService,
    private angLocal: LocalService
  ) {}

  ngOnInit() {
    this.angForum.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.forum = res["forum"];
        this.viewedPhoto = this.forum.photos[0].thumb400Url;

        if (this.forum.addedBy.photo.length > 0) {
          this.forum.addedBy.photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.addedUserImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.addedUserImage =
            "https://ui-avatars.com/api/?name=" +
            this.forum.addedBy.name.split(" ").join("+");
        }

        this.angLocation
          .getLocationFromZipcode(this.forum.addedBy.zipcode)
          .then(location => {
            this.userLocation = location;
          });

        this.publishedTime = this.angLocal.getTimeDifference(
          this.forum.timestamp
        );
        setInterval(() => {
          this.publishedTime = this.angLocal.getTimeDifference(
            this.forum.timestamp
          );
        }, 45000);
      },
      err => {
        console.log(err);
      }
    );
  }
}
