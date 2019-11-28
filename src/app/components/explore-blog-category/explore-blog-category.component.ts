import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-explore-blog-category",
  templateUrl: "./explore-blog-category.component.html",
  styleUrls: ["./explore-blog-category.component.scss"]
})
export class ExploreBlogCategoryComponent implements OnInit {
  public category: any;
  public blogs = [];
  public skip: number = 0;

  constructor(
    private angCategory: CategoryService,
    private angBlog: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.angCategory.getDetails(this.route.snapshot.params.cat).subscribe(
      res => {
        this.category = res["category"];
      },
      err => {
        console.log(err);
      }
    );

    this.angBlog
      .getCategoryBlogs(this.route.snapshot.params.cat, this.skip)
      .subscribe(
        resp => {
          resp["blogs"].forEach(blog => {
            this.blogs.push(blog);
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}
