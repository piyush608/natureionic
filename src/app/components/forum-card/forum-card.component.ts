import { Component, OnInit, Input } from "@angular/core";
import { LocalService } from "src/app/services/local.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-forum-card",
  templateUrl: "./forum-card.component.html",
  styleUrls: ["./forum-card.component.scss"]
})
export class ForumCardComponent implements OnInit {
  @Input() forum: any;
  public thumbnail: string;
  public userImage: string;
  public description: string;
  public publishedTime: any;

  constructor(private angLocal: LocalService, private router: Router) {}

  ngOnInit() {
    if (this.forum.photos.length > 0)
      this.thumbnail = this.forum.photos[0].thumb400Url;

    if (this.forum.addedBy.photo.length > 0) {
      this.forum.addedBy.photo.forEach(photo => {
        if (photo.isCurrent === "true") {
          this.userImage = photo.image.thumb200Url;
        }
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.forum.addedBy.name.split(" ").join("+");
    }

    if (this.forum.description && this.forum.description.length > 30)
      this.description = this.forum.description.substr(0, 30) + " ...";
    else this.description = this.forum.description;

    this.publishedTime = this.angLocal.getTimeDifference(this.forum.timestamp);
    setInterval(() => {
      this.publishedTime = this.angLocal.getTimeDifference(
        this.forum.timestamp
      );
    }, 45000);
  }

  openForum() {
    this.router.navigateByUrl("/view/forum/" + this.forum._id);
  }
}
