import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  public tab: string = "collection";

  constructor(private router: Router) {}

  ngOnInit() {}

  openEditProfile() {
    this.router.navigateByUrl("/edit-profile");
  }

  openFollowers() {
    this.router.navigateByUrl("/connection");
  }

  changeTab(value) {
    this.tab = value;
  }
}
