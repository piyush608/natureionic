import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product.model";
import { ActivatedRoute } from "@angular/router";
import { LocationService } from "src/app/services/location.service";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

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
  public isLiked: boolean = false;
  private user: any;

  constructor(
    private angProduct: ProductService,
    private route: ActivatedRoute,
    private angLocation: LocationService,
    private storage: Storage,
    private angUser: UserService
  ) {}

  ngOnInit() {
    this.angProduct.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.product = res["product"];
        this.viewedPhoto = this.product.photos[0].thumb400Url;

        if (this.product.addedBy.photo.length > 0) {
          this.product.addedBy.photo.forEach(photo => {
            this.addedUserImage = photo.image.thumb200Url;
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
      this.user = user;
      if (
        user.bookmarkedProducts.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;

      if (
        user.likedProducts.findIndex(
          index => index === this.route.snapshot.params._id
        ) === -1
      )
        this.isLiked = false;
      else this.isLiked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedProducts.push(this.product._id);
      this.update();
    } else {
      this.user.bookmarkedProducts.splice(
        this.user.bookmarkedProducts.findIndex(
          index => index === this.product._id
        ),
        1
      );
      this.update();
    }
    this.isBookmarked = !this.isBookmarked;
  }

  like() {
    if (this.isLiked === false) {
      this.user.likedProducts.push(this.product._id);
      this.product.likes += 1;
      this.update();
      this.updateProduct();
    } else {
      this.user.likedProducts.splice(
        this.user.likedProducts.findIndex(index => index === this.product._id),
        1
      );
      this.product.likes -= 1;
      this.update();
      this.updateProduct();
    }
    this.isLiked = !this.isLiked;
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.angUser.setUser(this.user);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateProduct() {
    this.angProduct.update(this.product._id, this.product).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
