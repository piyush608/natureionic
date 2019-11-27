import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-explore-recipe",
  templateUrl: "./explore-recipe.component.html",
  styleUrls: ["./explore-recipe.component.scss"]
})
export class ExploreRecipeComponent implements OnInit {
  public recipes = [];
  public categories = [];

  constructor(
    private angRecipe: RecipeService,
    private angCategory: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("recipe").subscribe(
      res => {
        this.categories = res["categories"];

        this.categories.forEach(category => {
          this.angRecipe.getCategoryRecipes(category._id, "0").subscribe(
            resp => {
              resp["recipes"].forEach(recipe => {
                this.recipes.push(recipe);
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

  exploreCategory(_id) {
    this.router.navigateByUrl("/explore/recipe/category/" + _id);
  }
}
