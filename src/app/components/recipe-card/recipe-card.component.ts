import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any;
  public thumbnail: any;
  public userImage: any;
  public isBookmarked: boolean = false;

  constructor(public router: Router, private storage: Storage) {}

  ngOnInit() {
    this.thumbnail = this.recipe.photos[0].thumb400Url;

    if (this.recipe.addedBy.photo.length > 0) {
      this.recipe.addedBy.photo.forEach(photo => {
        this.userImage = photo.image.thumb200Url;
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.recipe.addedBy.name.split(" ").join("+");
    }

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedRecipes.findIndex(index => index === this.recipe._id) ===
        -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  openRecipe() {
    this.router.navigateByUrl("/view/recipe/" + this.recipe._id);
  }
}
