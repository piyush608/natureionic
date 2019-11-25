import { Component, OnInit } from "@angular/core";
import { Group } from "src/app/models/group.model";
import { GroupService } from "src/app/services/group.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-group",
  templateUrl: "./view-group.component.html",
  styleUrls: ["./view-group.component.scss"]
})
export class ViewGroupComponent implements OnInit {
  public group = new Group();
  public viewedPhoto: string;
  public addedUserImage: string;

  constructor(private angGroup: GroupService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.angGroup.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        console.log(res);
        this.group = res["group"];
        this.viewedPhoto = this.group.photos[0].originalUrl;

        if (this.group.addedBy.photo.length > 0) {
          this.group.addedBy.photo.forEach(photo => {
            this.addedUserImage = photo.image.thumb200Url;
          });
        } else {
          this.addedUserImage =
            "https://ui-avatars.com/api/?name=" +
            this.group.addedBy.name.split(" ").join("+");
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
