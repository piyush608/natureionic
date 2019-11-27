import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-explore-product-category",
  templateUrl: "./explore-product-category.component.html",
  styleUrls: ["./explore-product-category.component.scss"]
})
export class ExploreProductCategoryComponent implements OnInit {
  public category: any;
  public products = [];
  public skip: number = 0;

  constructor(
    private angCategory: CategoryService,
    private angProduct: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.angCategory.getDetails(this.route.snapshot.params.cat).subscribe(
      res => {
        this.category = res["category"];
      },
      err => {
        console.log(err);
      }
    );

    this.angProduct
      .getCategoryProducts(this.route.snapshot.params.cat, this.skip)
      .subscribe(
        res => {
          res["products"].forEach(product => {
            this.products.push(product);
          });
        },
        err => {
          console.log(err);
        }
      );
  }
}
