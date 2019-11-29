import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product.model";
import { ActivatedRoute } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.scss"]
})
export class ViewProductComponent implements OnInit {
  public product = new Product();
  public viewedPhoto: any;
  public addedUserImage: any;
  public userLocation: any;
  public isBookmarked: boolean = false;

  constructor(
    private angProduct: ProductService,
    private route: ActivatedRoute,
    private angLocation: LocationService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.angProduct.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.product = res["product"];
        this.viewedPhoto = this.product.photos[0].thumb400Url;

        if (this.product.addedBy.photo.length > 0) {
          this.product.addedBy.photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.addedUserImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.addedUserImage =
            "https://ui-avatars.com/api/?name=" +
            this.product.addedBy.name.split(" ").join("+");
        }

        this.angLocation
          .getLocationFromZipcode(this.product.addedBy.zipcode)
          .then(location => {
            this.userLocation = location;
          });
      },
      err => {
        console.log(err);
      }
    );

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedProducts.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }
}
