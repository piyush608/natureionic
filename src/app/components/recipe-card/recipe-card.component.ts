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
    console.log(this.recipe);
    this.thumbnail = this.recipe.photos[0].thumb400Url;
  }
}
