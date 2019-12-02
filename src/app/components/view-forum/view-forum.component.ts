import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { ActivatedRoute } from "@angular/router";
import { Forum } from "src/app/models/forum.model";
import { LocationService } from "src/app/services/location.service";
import { LocalService } from "src/app/services/local.service";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";
import { Comment } from "src/app/models/comment.model";

@Component({
  selector: "app-view-forum",
  templateUrl: "./view-forum.component.html",
  styleUrls: ["./view-forum.component.scss"]
})
export class ViewForumComponent implements OnInit {
  public forum = new Forum();
  public comment = new Comment();
  public addedUserImage: string;
  public viewedPhoto: string;
  public userLocation: any;
  public publishedTime: any;
  private user: any;
  public isLiked: boolean = false;
  public disLiked: boolean = false;
  private addedBy = {
    name: "",
    zipcode: "",
    photo: ""
  };

  constructor(
    private angForum: ForumService,
    private route: ActivatedRoute,
    private angLocation: LocationService,
    private angLocal: LocalService,
    private storage: Storage,
    private angUser: UserService
  ) {}

  ngOnInit() {
    this.angForum.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.forum = res["forum"];

        if (this.forum.photos.length > 0)
          this.viewedPhoto = this.forum.photos[0].thumb400Url;

        if (this.forum.addedBy.photo.length > 0) {
          this.forum.addedBy.photo.forEach(photo => {
            this.addedUserImage = photo.image.thumb200Url;
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

    this.storage.get("user").then(user => {
      this.user = user;
      this.addedBy.name = user.name;
      this.addedBy.zipcode = user.zipcode;
      if (
        user.likedForums.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isLiked = false;
      else this.isLiked = true;

      if (
        user.dislikedForums.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.disLiked = false;
      else this.disLiked = true;
    });

    this.angUser.getProfileImage().subscribe(
      res => {
        this.addedBy.photo = res["user"].photo;
      },
      err => {
        console.log(err);
      }
    );

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  like() {
    if (this.isLiked === false) {
      this.user.likedForums.push(this.forum._id);
      this.forum.likes += 1;

      if (
        this.user.dislikedForums.findIndex(
          index => index === this.route.snapshot.params._id
        ) !== -1
      ) {
        this.user.dislikedForums.splice(
          this.user.dislikedForums.findIndex(index => index === this.forum._id),
          1
        );
        this.forum.dislikes -= 1;
        this.disLiked = !this.disLiked;
      }

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

  dislike() {
    if (this.disLiked === false) {
      this.user.dislikedForums.push(this.forum._id);
      this.forum.dislikes += 1;

      if (
        this.user.likedForums.findIndex(
          index => index === this.route.snapshot.params._id
        ) !== -1
      ) {
        this.user.likedForums.splice(
          this.user.likedForums.findIndex(index => index === this.forum._id),
          1
        );
        this.forum.likes -= 1;
        this.isLiked = !this.isLiked;
      }

      this.update();
      this.updateForum();
    } else {
      this.user.dislikedForums.splice(
        this.user.dislikedForums.findIndex(index => index === this.forum._id),
        1
      );
      this.forum.dislikes -= 1;
      this.update();
      this.updateForum();
    }
    this.disLiked = !this.disLiked;
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

  submitComment() {
    this.angForum.submitComment(this.forum._id, this.comment).subscribe(
      res => {
        this.forum.commentsCount += 1;
        this.comment.addedBy = this.addedBy;
        this.forum.comments.push(this.comment);
        this.comment = new Comment();
      },
      err => {
        console.log(err);
      }
    );
  }
}
