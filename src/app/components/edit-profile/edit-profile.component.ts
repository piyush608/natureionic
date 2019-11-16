import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user.model";
import { ImageService } from "src/app/services/image.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  public user = new User();
  public file: any;
  public localFile: any;
  private loader: any;

  constructor(
    private angUser: UserService,
    private angImage: ImageService,
    public router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.angUser.getProfile().subscribe(
      res => {
        this.user = res["user"];

        if (res["user"].photo.length > 0) {
          res["user"].photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.localFile = photo.image.thumb400Url;
            }
          });
        } else {
          this.localFile =
            "https://ui-avatars.com/api/?name=" +
            res["user"].name.split(" ").join("+");
        }
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
        this.localFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  update() {
    this.presentLoading();

    delete this.user.bookmarkedBusinesses;
    delete this.user.bookmarkedBlogs;
    delete this.user.bookmarkedProducts;
    delete this.user.bookmarkedRecipes;
    delete this.user.bookmarkedVlogs;
    delete this.user.likedBusinesses;
    delete this.user.likedProducts;
    delete this.user.likedRecipes;
    delete this.user.photo;
    delete this.user.password;

    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.user = res["newUser"];
        if (this.file) {
          this.angImage
            .uploadImage("users", res["newUser"]._id, this.file)
            .then(url => {
              this.uploadImageURL(url);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.dismissLoading();
          this.router.navigateByUrl("/profile");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  uploadImageURL(URL) {
    this.angImage.uploadImageURL(URL).subscribe(res => {
      const photo = {
        image: res["photo"]._id,
        isCurrent: true
      };
      this.user.photo.push(photo);

      const filename = res["photo"].originalUrl.split("/");
      const params = {
        path: res["photo"].originalUrl,
        key: "users/" + this.user._id + "/",
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

      this.angUser.update(this.user._id, this.user).subscribe(
        () => {
          this.dismissLoading();
          this.router.navigateByUrl("/profile");
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
}
