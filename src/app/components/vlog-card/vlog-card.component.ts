import { Component, OnInit, Input } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-vlog-card",
  templateUrl: "./vlog-card.component.html",
  styleUrls: ["./vlog-card.component.scss"]
})
export class VlogCardComponent implements OnInit {
  @Input() vlog: any;
  public thumbnail: any;
  public userImage: any;
  public isBookmarked: boolean = false;

  constructor(private storage: Storage) {}

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
}
