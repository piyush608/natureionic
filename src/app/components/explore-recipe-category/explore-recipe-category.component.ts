import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-explore-recipe-category",
  templateUrl: "./explore-recipe-category.component.html",
  styleUrls: ["./explore-recipe-category.component.scss"]
})
export class ExploreRecipeCategoryComponent implements OnInit {
  public recipes = [];
  public category: any;
  public skip: number = 0;

  constructor(
    private angRecipe: RecipeService,
    private route: ActivatedRoute,
    private angCategory: CategoryService
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

    this.angRecipe
      .getCategoryRecipes(this.route.snapshot.params.cat, this.skip)
      .subscribe(
        res => {
          res["recipes"].forEach(recipe => {
            this.recipes.push(recipe);
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}
