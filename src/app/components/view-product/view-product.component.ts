import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"]
})
export class ViewProductComponent implements OnInit {
  public product = new Product();
  public viewedPhoto: any;

  constructor(
    private angProduct: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.angProduct.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        console.log(res);
        this.product = res["product"];
        this.viewedPhoto = this.product.photos[0].thumb400Url;
      },
      err => {
        console.log(err);
      }
    );
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }
}
