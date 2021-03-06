import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { CategoryService } from "src/app/services/category.service";
import { VlogService } from "src/app/services/vlog.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inspiration",
  templateUrl: "./inspiration.component.html",
  styleUrls: ["./inspiration.component.scss"]
})
export class InspirationComponent implements OnInit {
  public blogs = [];
  public vlogs = [];
  public categories = [];

  constructor(
    private angBlog: BlogService,
    private angCategory: CategoryService,
    private angVlog: VlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("blog").subscribe(
      res => {
        this.categories = res["categories"];
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

    this.angVlog.getPopular().subscribe(
      res => {
        this.vlogs = res["vlogs"];
      },
      err => {
        console.log(err);
      }
    );
  }

  exploreBlog() {
    this.router.navigateByUrl("/explore/article");
  }

  exploreVlog() {
    this.router.navigateByUrl("/explore/vlog");
  }

  exploreCategory(_id) {
    this.router.navigateByUrl("/explore/article/category/" + _id);
  }
}
