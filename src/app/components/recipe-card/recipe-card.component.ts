import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

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
  private user: any;

  constructor(
    public router: Router,
    private storage: Storage,
    private angUser: UserService
  ) {}

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
      this.user = user;
      if (
        user.bookmarkedRecipes.findIndex(index => index === this.recipe._id) ===
        -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  openRecipe() {
    this.router.navigateByUrl("/view/recipe/" + this.recipe._id);
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
        this.angUser.setUser(this.user);
        this.isBookmarked = !this.isBookmarked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
