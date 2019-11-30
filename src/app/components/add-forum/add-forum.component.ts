import { Component, OnInit } from "@angular/core";
import { Forum } from "src/app/models/forum.model";
import { LoadingController } from "@ionic/angular";
import { ImageService } from "src/app/services/image.service";
import { ForumService } from "src/app/services/forum.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-add-forum",
  templateUrl: "./add-forum.component.html",
  styleUrls: ["./add-forum.component.scss"]
})
export class AddForumComponent implements OnInit {
  public forum = new Forum();
  public tab: string = "photo";
  public localImage: any;
  public image: any;
  public loader: any;

  constructor(
    private loadingController: LoadingController,
    private angImage: ImageService,
    private angForum: ForumService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.forum.type = "photo";

    this.storage.get("group_post").then(data => {
      if (data) {
        this.forum.group = data.group;
        this.forum.public = false;
      }
    });
  }

  changeTab(type) {
    this.tab = type;
    this.forum.type = type;
  }

  uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;

      // code for file preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.localImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addForum() {
    this.presentLoading();

    this.angForum.create(this.forum).subscribe(
      res => {
        this.forum = res["newForum"];

        this.storage.remove("group_post");

        if (this.forum.type === "photo") {
          this.angImage
            .uploadImage("forums", res["newForum"]._id, this.image)
            .then(url => {
              this.getImageRef(url);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.dismissLoading();
          this.router.navigateByUrl("/view/forum/" + this.forum._id);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageRef(URL) {
    this.angImage.uploadImageURL(URL).subscribe(
      res => {
        this.forum.photos.push(res["photo"]._id);
        const filename = res["photo"].originalUrl.split("/");
        const params = {
          path: res["photo"].originalUrl,
          key: "forums/" + this.forum._id + "/",
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

        this.angForum.update(this.forum._id, this.forum).subscribe(
          () => {
            this.dismissLoading();
            this.router.navigateByUrl("/view/forum/" + this.forum._id);
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
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
