import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "app-explore-blog",
  templateUrl: "./explore-blog.component.html",
  styleUrls: ["./explore-blog.component.scss"]
})
export class ExploreBlogComponent implements OnInit {
  public categories = [];
  public blogs = [];

  constructor(
    private angCategory: CategoryService,
    private angBlog: BlogService
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("blog").subscribe(
      res => {
        this.categories = res["categories"];

        this.categories.forEach(category => {
          this.angBlog.getCategoryBlogs(category._id).subscribe(
            resp => {
              console.log(resp);
              resp["blogs"].forEach(blog => {
                this.blogs.push(blog);
              });
            },
            err => {
              console.log(err);
            }
          );
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
