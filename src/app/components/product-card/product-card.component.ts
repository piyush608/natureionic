import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  public thumbnail: any;
  public userImage: any;

  constructor(public router: Router) {}

  ngOnInit() {
    this.thumbnail = this.product.photos[0].thumb400Url;

    if (this.product.addedBy.photo.length > 0) {
      this.product.addedBy.photo.forEach(photo => {
        if (photo.isCurrent === "true") {
          this.userImage = photo.image.thumb200Url;
        }
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.product.addedBy.name.split(" ").join("+");
    }
  }

  openProduct() {
    this.router.navigateByUrl("/view/product/" + this.product._id);
  }
}
