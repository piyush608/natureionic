import { Component, OnInit, Input } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"]
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  public thumbnail: any;
  private user: any;
  public isBookmarked: boolean = false;

  constructor(private storage: Storage, private angUser: UserService) {}

  ngOnInit() {
    this.thumbnail = this.blog.photos[0].thumb400Url;

    this.storage.get("user").then(user => {
      this.user = user;
      if (
        user.bookmarkedBlogs.findIndex(index => index === this.blog._id) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  openBlog() {
    window.open(this.blog.url, "_blank");
  }

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedBlogs.push(this.blog._id);
      this.update();
    } else {
      this.user.bookmarkedBlogs.splice(
        this.user.bookmarkedBlogs.findIndex(index => index === this.blog._id),
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
