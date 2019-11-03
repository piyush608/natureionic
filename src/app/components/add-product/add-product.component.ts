import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/services/product.service";
import { ImageService } from "src/app/services/image.service";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
  entryComponents: [SuccessModalComponent]
})
export class AddProductComponent implements OnInit {
  public product = new Product();
  public categories = [];
  public subcategories = [];
  public userImage: any;
  public localUserImage: any;
  public files = [];
  public localFiles = [];

  constructor(
    public modalController: ModalController,
    private angProduct: ProductService,
    private angImage: ImageService,
    private angCategory: CategoryService
  ) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent
    });
    return await modal.present();
  }

  getCategories() {
    this.angCategory.getCategories("product").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );
  }

  getSubcategories(_id) {
    this.subcategories = this.categories[
      this.categories.findIndex(category => category._id === _id)
    ].subcategories;
  }

  uploadUserImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.userImage = file;

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localUserImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.files.push(file);

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct() {
    this.angProduct.addProduct(this.product).subscribe(
      res => {
        this.product = res["newProduct"];

        this.files.forEach(file => {
          this.angImage
            .uploadImage("products", res["newProduct"]._id, file)
            .then(url => {
              this.getImageRef(url);
            })
            .catch(err => {
              console.log(err);
            });
        });

        this.angImage
          .uploadImage("products", this.product._id, this.userImage)
          .then(url => {
            this.uploadOwnerImage(url);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageRef(URL) {
    this.angImage.uploadImageURL(URL).subscribe(
      res => {
        this.product.photos.push(res["photo"]._id);
        const filename = res["photo"].originalUrl.split("/");
        const params = {
          path: res["photo"].originalUrl,
          key: "products/" + this.product._id + "/",
          filename: filename[filename.length - 1]
        };
        this.angImage.resizeImage(params).subscribe(
          resp => {
            console.log(resp);
          },
          err => {
            console.log(err);
          }
        );

        if (this.product.photos.length === this.files.length) {
          this.angProduct.update(this.product._id, this.product).subscribe(
            () => {
              this.presentModal();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadOwnerImage(URL) {
    this.angImage.uploadImageURL(URL).subscribe(res => {
      this.product.ownerImage = res["photo"]._id;

      const filename = res["photo"].originalUrl.split("/");
      const params = {
        path: res["photo"].originalUrl,
        key: "products/" + this.product._id + "/",
        filename: filename[filename.length - 1]
      };
      this.angImage.resizeImage(params).subscribe(
        resp => {
          console.log(resp);
        },
        err => {
          console.log(err);
        }
      );

      this.angProduct.update(this.product._id, this.product).subscribe(
        () => {
          console.log("Recipe updated.");
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
