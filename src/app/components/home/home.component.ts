import { Component, OnInit } from "@angular/core";
import { RecipeService } from "src/app/services/recipe.service";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public city: string;
  public state: string;
  public country: string;
  public username: string;
  public recipes = [];

  constructor(
    private angRecipe: RecipeService,
    private angProduct: ProductService,
    private angCategory: CategoryService,
    private router: Router,
    private angLocation: LocationService,
    private angUser: UserService
  ) {}

  ngOnInit() {
    this.getCurrentPosition();
    this.getUserName();

    this.angCategory.getCategories("business").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.angRecipe.getPopular().subscribe(
      res => {
        console.log(res);
        this.recipes = res["recipes"];
      },
      err => {
        console.log(err);
      }
    );

    this.angProduct.getRandom().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCurrentPosition() {
    this.angLocation.getPosition().then(res => {
      this.getLatLngCode(res._lat, res._long);
    });
  }

  getUserName() {
    this.angUser.getProfileImage().subscribe(
      res => {
        this.username = res["user"].name.split(" ")[0];
      },
      err => {
        console.log(err);
      }
    );
  }

  getLatLngCode(lat, lng) {
    this.angLocation
      .codeLatLng(lat, lng)
      .then(location => {
        this.city = location.city;
        this.state = location.stateSN;
        this.country = location.country;
      })
      .catch(err => {
        console.log(err);
      });
  }

  addBusiness() {
    this.router.navigateByUrl("/add/business");
  }

  addRecipe() {
    this.router.navigateByUrl("/add/recipe");
  }

  addProduct() {
    this.router.navigateByUrl("/add/product");
  }
}
