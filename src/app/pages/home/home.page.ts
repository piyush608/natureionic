import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private angRecipe: RecipeService,
    private angProduct: ProductService,
    private angCategory: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("business").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.angRecipe.getRandom().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.angProduct.getRandom().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  addBusiness() {
    this.router.navigateByUrl("/add/business");
  }

  addRecipe() {
    this.router.navigateByUrl("/add/recipe");
  }
}
