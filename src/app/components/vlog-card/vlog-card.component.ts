import { Component, OnInit, Input } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-vlog-card",
  templateUrl: "./vlog-card.component.html",
  styleUrls: ["./vlog-card.component.scss"]
})
export class VlogCardComponent implements OnInit {
  @Input() vlog: any;
  public thumbnail: any;
  public userImage: any;
  private user: any;
  public isBookmarked: boolean = false;

  constructor(private storage: Storage, private angUser: UserService) {}

  ngOnInit() {
    this.thumbnail =
      "https://img.youtube.com/vi/" + this.getVideoId() + "/hqdefault.jpg";

    if (this.vlog.addedBy.photo.length > 0) {
      this.vlog.addedBy.photo.forEach(photo => {
        if (photo.isCurrent === "true") {
          this.userImage = photo.image.thumb200Url;
        }
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.vlog.addedBy.name.split(" ").join("+");
    }

    this.storage.get("user").then(user => {
      this.user = user;
      if (
        user.bookmarkedVlogs.findIndex(index => index === this.vlog._id) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  getVideoId() {
    var video_id = this.vlog.url.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    return video_id;
  }

  openVlog() {
    window.open(this.vlog.url, "_blank");
  }

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedVlogs.push(this.vlog._id);
      this.update();
    } else {
      this.user.bookmarkedVlogs.splice(
        this.user.bookmarkedVlogs.findIndex(index => index === this.vlog._id),
        1
      );
      this.update();
    }
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.storage.set("user", this.user);
        this.isBookmarked = !this.isBookmarked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
