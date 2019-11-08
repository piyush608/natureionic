import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverMenuComponent } from "../popover-menu/popover-menu.component";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public profileImage: any;

  constructor(
    public popoverController: PopoverController,
    public router: Router,
    private angUser: UserService
  ) {}

  ngOnInit() {
    this.angUser.getProfileImage().subscribe(
      res => {
        if (res["user"].photo.length > 0) {
          res["user"].photo.forEach(photo => {
            if (photo.isCurrent === "true") {
              this.profileImage = photo.image.thumb200Url;
            }
          });
        } else {
          this.profileImage =
            "https://ui-avatars.com/api/?name=" +
            res["user"].name.split(" ").join("+");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  openProfile() {
    this.router.navigateByUrl("/profile");
  }
}
