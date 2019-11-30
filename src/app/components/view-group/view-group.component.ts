import { Component, OnInit } from "@angular/core";
import { Group } from "src/app/models/group.model";
import { GroupService } from "src/app/services/group.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ForumService } from "src/app/services/forum.service";

@Component({
  selector: "app-view-group",
  templateUrl: "./view-group.component.html",
  styleUrls: ["./view-group.component.scss"]
})
export class ViewGroupComponent implements OnInit {
  public group = new Group();
  public viewedPhoto: string;
  public addedUserImage: string;
  private skip: number = 0;
  public forums = [];

  constructor(
    private angGroup: GroupService,
    public route: ActivatedRoute,
    private storage: Storage,
    private router: Router,
    private angForum: ForumService
  ) {}

  ngOnInit() {
    this.angGroup.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
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

    this.angForum
      .getGroupForums(this.route.snapshot.params._id, this.skip)
      .subscribe(
        res => {
          this.forums = res["forums"];
        },
        err => {
          console.log(err);
        }
      );
  }

  addForum() {
    const group_post = {
      group: this.route.snapshot.params._id,
      public: false
    };
    this.storage.set("group_post", group_post).then(() => {
      this.router.navigateByUrl("/add/forum");
    });
  }
}
