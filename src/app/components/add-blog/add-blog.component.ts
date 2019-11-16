import { Component, OnInit } from "@angular/core";
import { Blog } from "src/app/models/blog.model";
import { CategoryService } from "src/app/services/category.service";
import { BlogService } from "src/app/services/blog.service";
import { ImageService } from "src/app/services/image.service";
import { LoadingController, ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.scss"]
})
export class AddBlogComponent implements OnInit {
  public blog = new Blog();
  public categories = [];
  public localImage: any;
  public file: any;
  public loader: any;

  constructor(
    private angCategory: CategoryService,
    private angBlog: BlogService,
    private angImage: ImageService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.angCategory.getCategories("blog").subscribe(
      res => {
        this.categories = res["categories"];
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addBlog() {
    this.presentLoading();

    this.angBlog.addBlog(this.blog).subscribe(
      res => {
        this.blog = res["newBlog"];

        this.angImage
          .uploadImage("blogs", res["newBlog"]._id, this.file)
          .then(url => {
            this.uploadImageURL(url);
          })
          .catch(err => {
            console.log(err);
          });
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadImageURL(URL) {
    this.angImage.uploadImageURL(URL).subscribe(res => {
      this.blog.photos.push(res["photo"]._id);
      const filename = res["photo"].originalUrl.split("/");

      const params = {
        path: res["photo"].originalUrl,
        key: "blogs/" + this.blog._id + "/",
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

      this.angBlog.update(this.blog._id, this.blog).subscribe(
        () => {
          this.dismissLoading();
          this.presentModal();
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: "Please wait"
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {
        _id: this.blog._id,
        type: "blog"
      }
    });
    return await modal.present();
  }
}
