import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { CategoryService } from "src/app/services/category.service";
import { VlogService } from "src/app/services/vlog.service";

@Component({
  selector: "app-inspiration",
  templateUrl: "./inspiration.component.html",
  styleUrls: ["./inspiration.component.scss"]
})
export class InspirationComponent implements OnInit {
  public blogs = [];
  public vlogs = [];

  constructor(
    private angBlog: BlogService,
    private angCategory: CategoryService,
    private angVlog: VlogService
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("blog").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.angBlog.getPopular().subscribe(
      res => {
        this.blogs = res["blogs"];
      },
      err => {
        console.log(err);
      }
    );

    this.angVlog.getRandom().subscribe(
      res => {
        this.vlogs = res["vlogs"];
      },
      err => {
        console.log(err);
      }
    );
  }
}
