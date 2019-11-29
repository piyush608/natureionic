import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  public thumbnail: any;
  public userImage: any;
  public isBookmarked: boolean = false;

  constructor(public router: Router, private storage: Storage) {}

  ngOnInit() {
    this.thumbnail = this.product.photos[0].thumb400Url;

    if (this.product.addedBy.photo.length > 0) {
      this.product.addedBy.photo.forEach(photo => {
        this.userImage = photo.image.thumb200Url;
      });
    } else {
      this.userImage =
        "https://ui-avatars.com/api/?name=" +
        this.product.addedBy.name.split(" ").join("+");
    }

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedProducts.findIndex(
          index => index === this.product._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  openProduct() {
    this.router.navigateByUrl("/view/product/" + this.product._id);
  }
}
