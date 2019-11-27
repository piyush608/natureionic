import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-explore-product",
  templateUrl: "./explore-product.component.html",
  styleUrls: ["./explore-product.component.scss"]
})
export class ExploreProductComponent implements OnInit {
  public categories = [];
  public products = [];

  constructor(
    private angCategory: CategoryService,
    private angProduct: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("product").subscribe(
      res => {
        this.categories = res["categories"];

        this.categories.forEach(category => {
          this.angProduct.getCategoryProducts(category._id, "0").subscribe(
            resp => {
              resp["products"].forEach(product => {
                this.products.push(product);
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
    this.router.navigateByUrl("/explore/product/category/" + _id);
  }
}
