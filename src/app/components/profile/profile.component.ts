import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
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
