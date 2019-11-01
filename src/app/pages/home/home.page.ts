import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private angRecipe: RecipeService,
    private angProduct: ProductService,
    private angCategory: CategoryService
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
}
