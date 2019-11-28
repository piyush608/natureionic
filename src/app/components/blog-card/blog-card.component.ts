import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"]
})
export class BlogCardComponent implements OnInit {
  @Input() blog: any;
  public thumbnail: any;

  constructor() {}

  ngOnInit() {
    this.thumbnail = this.blog.photos[0].thumb400Url;
  }

  openBlog() {
    window.open(this.blog.url, "_blank");
  }
}
