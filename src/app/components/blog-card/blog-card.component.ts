import { Component, OnInit, Input } from "@angular/core";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"]
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  public thumbnail: any;
  public isBookmarked: boolean = false;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.thumbnail = this.blog.photos[0].thumb400Url;

    this.storage.get("user").then(user => {
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
}
