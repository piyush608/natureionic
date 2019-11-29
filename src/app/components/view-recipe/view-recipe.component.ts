import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "src/app/models/recipe.model";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-view-recipe",
  templateUrl: "./view-recipe.component.html",
  styleUrls: ["./view-recipe.component.scss"]
})
export class ViewRecipeComponent implements OnInit {
  public recipe = new Recipe();
  public viewedPhoto: any;
  public addedUserImage: any;
  public isBookmarked: boolean = false;

  constructor(
    private angRecipe: RecipeService,
    private route: ActivatedRoute,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.angRecipe.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.recipe = res["recipe"];
        this.viewedPhoto = this.recipe.photos[0].thumb400Url;

        if (this.recipe.addedBy.photo.length > 0) {
          this.recipe.addedBy.photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.addedUserImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.addedUserImage =
            "https://ui-avatars.com/api/?name=" +
            this.recipe.addedBy.name.split(" ").join("+");
        }
      },
      err => {
        console.log(err);
      }
    );

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedRecipes.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }
}
