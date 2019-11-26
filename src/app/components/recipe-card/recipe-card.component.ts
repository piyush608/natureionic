import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any;
  public thumbnail: any;
  public userImage: any;

  constructor(public router: Router) {}

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
  }

  openRecipe() {
    this.router.navigateByUrl("/view/recipe/" + this.recipe._id);
  }
}
