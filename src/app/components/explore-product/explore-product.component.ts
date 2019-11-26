import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";

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
    private angProduct: ProductService
  ) {}

  ngOnInit() {
    this.angCategory.getCategories("product").subscribe(
      res => {
        this.categories = res["categories"];

        this.categories.forEach(category => {
          this.angProduct.getCategoryProducts(category._id).subscribe(
            resp => {
              console.log(resp);
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
}
