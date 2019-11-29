import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { Recipe } from "src/app/models/recipe.model";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

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
  private user: any;

  constructor(
    private angRecipe: RecipeService,
    private route: ActivatedRoute,
    private storage: Storage,
    private angUser: UserService
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
      this.user = user;
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

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedRecipes.push(this.recipe._id);
      this.update();
    } else {
      this.user.bookmarkedRecipes.splice(
        this.user.bookmarkedRecipes.findIndex(
          index => index === this.recipe._id
        ),
        1
      );
      this.update();
    }
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.storage.set("user", this.user);
        this.isBookmarked = !this.isBookmarked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
