import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  public thumbnail: any;
  public userImage: any;
  private user: any;
  public isBookmarked: boolean = false;

  constructor(
    public router: Router,
    private storage: Storage,
    private angUser: UserService
  ) {}

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
      this.user = user;
      if (
        user.bookmarkedProducts.findIndex(
          index => index === this.product._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  openProduct() {
    this.router.navigateByUrl("/view/product/" + this.product._id);
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
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.angUser.setUser(this.user);
        this.isBookmarked = !this.isBookmarked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
