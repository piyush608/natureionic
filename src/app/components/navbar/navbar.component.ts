import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverMenuComponent } from "../popover-menu/popover-menu.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  constructor(
    public popoverController: PopoverController,
    public router: Router
  ) {}

  ngOnInit() {}

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
