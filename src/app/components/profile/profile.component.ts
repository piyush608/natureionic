import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user.model";
import { LocationService } from "src/app/services/location.service";
import { LevelService } from "src/app/services/level.service";
import { Level } from "src/app/models/level.model";
import { RecipeService } from "src/app/services/recipe.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public user = new User();
  public profileImage: string;
  public tab: string = "collection";
  public location: any;
  public level = new Level();
  public collectionTab: string = "business";
  public bookmarkedBusinesses = [];
  public bookmarkedRecipes = [];
  public bookmarkedProducts = [];
  public bookmarkedBlogs = [];
  public bookmarkedVlogs = [];
  public addedRecipes = [];
  public addedProducts = [];

  constructor(
    private router: Router,
    private angUser: UserService,
    private angLocation: LocationService,
    private angLevel: LevelService,
    private angRecipe: RecipeService,
    private angProduct: ProductService
  ) {}

  ngOnInit() {
    this.angUser.getProfile().subscribe(
      res => {
        console.log(res);
        this.user = res["user"];
        this.bookmarkedBusinesses = this.user.bookmarkedBusinesses;
        this.bookmarkedRecipes = this.user.bookmarkedRecipes;
        this.bookmarkedProducts = this.user.bookmarkedProducts;
        this.bookmarkedBlogs = this.user.bookmarkedBlogs;
        this.bookmarkedVlogs = this.user.bookmarkedVlogs;

        if (res["user"].photo.length > 0) {
          res["user"].photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.profileImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.profileImage =
            "https://ui-avatars.com/api/?name=" +
            res["user"].name.split(" ").join("+");
        }

        this.angLocation
          .getLocationFromZipcode(this.user.zipcode)
          .then(location => {
            this.location = location;
          })
          .catch(err => {
            console.log(err);
          });

        this.angLevel.getUserLevel(this.user.points).subscribe(
          res => {
            this.level = res["level"];
          },
          err => {
            console.log(err);
          }
        );

        this.angRecipe.getUserRecipes(this.user._id).subscribe(
          res => {
            this.addedRecipes = res["recipes"];
          },
          err => {
            console.log(err);
          }
        );

        this.angProduct.getUserProducts(this.user._id).subscribe(
          res => {
            console.log(res);
            this.addedProducts = res["products"];
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  openEditProfile() {
    this.router.navigateByUrl("/edit-profile");
  }

  openFollowers() {
    this.router.navigateByUrl("/connection");
  }

  changeTab(value) {
    this.tab = value;
  }

  changeCollectionTab(value) {
    this.collectionTab = value;
  }
}
