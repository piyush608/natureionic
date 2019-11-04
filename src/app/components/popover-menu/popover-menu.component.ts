import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-popover-menu",
  templateUrl: "./popover-menu.component.html",
  styleUrls: ["./popover-menu.component.scss"]
})
export class PopoverMenuComponent implements OnInit {
  constructor(private angAuth: AuthService, private router: Router) {}

  ngOnInit() {}

  signOut() {
    this.angAuth.logout();
    this.router.navigateByUrl("/login");
  }
}
