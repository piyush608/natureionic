import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"]
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any;
  public thumbnail: any;
  public userImage: any;

  constructor() {}

  ngOnInit() {
    this.thumbnail = this.recipe.photos[0].thumb400Url;

    if (this.recipe.addedBy.photo.length > 0) {
      this.recipe.addedBy.photo.forEach(photo => {
        if (photo.isCurrent === "true") {
          this.userImage = photo.image.thumb200Url;
        }
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.recipe.addedBy.name.split(" ").join("+");
    }
  }
}
