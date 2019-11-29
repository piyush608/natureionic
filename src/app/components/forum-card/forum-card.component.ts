import { Component, OnInit, Input } from "@angular/core";
import { LocalService } from "src/app/services/local.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";
import { ForumService } from "src/app/services/forum.service";

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
  public isLiked: boolean = false;
  public user: any;

  constructor(
    private angLocal: LocalService,
    private router: Router,
    private storage: Storage,
    private angUser: UserService,
    private angForum: ForumService
  ) {}

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

    this.storage.get("user").then(user => {
      this.user = user;
      if (user.likedForums.findIndex(index => index === this.forum._id) === -1)
        this.isLiked = false;
      else this.isLiked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  openForum() {
    this.router.navigateByUrl("/view/forum/" + this.forum._id);
  }

  like() {
    if (this.isLiked === false) {
      this.user.likedForums.push(this.forum._id);
      this.forum.likes += 1;
      this.update();
      this.updateForum();
    } else {
      this.user.likedForums.splice(
        this.user.likedForums.findIndex(index => index === this.forum._id),
        1
      );
      this.forum.likes -= 1;
      this.update();
      this.updateForum();
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

  updateForum() {
    this.angForum.update(this.forum._id, this.forum).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
