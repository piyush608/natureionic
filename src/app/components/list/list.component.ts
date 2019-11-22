import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  addBusiness() {
    this.router.navigateByUrl("/add/business");
  }

  addRecipe() {
    this.router.navigateByUrl("/add/recipe");
  }

  addProduct() {
    this.router.navigateByUrl("/add/product");
  }

  addBlog() {
    this.router.navigateByUrl("/add/article");
  }

  addVlog() {
    this.router.navigateByUrl("/add/vlog");
  }

  addForum() {
    this.router.navigateByUrl("/add/forum");
  }
}
