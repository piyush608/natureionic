import { Component, OnInit } from "@angular/core";
import { PlatformService } from "src/app/services/platform.service";
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user = new User();

  constructor(
    private angAuth: AuthService,
    private router: Router,
    private platform: Platform,
    private angPlatform: PlatformService
  ) {}

  ngOnInit() {
    document.URL.indexOf("http") !== 0
      ? (this.user.deviceType = "App")
      : (this.user.deviceType = "PWA");
    this.user.device = this.platform.platforms()[0];

    if (this.user.deviceType === "PWA")
      this.user.browser = this.angPlatform.getBrowserInfo();
  }

  login() {
    this.angAuth.login(this.user).subscribe(
      res => {
        this.angAuth.setToken(res["token"]);
        this.angAuth.loggedIn.next(true);
        this.router.navigateByUrl("/home");
      },
      err => {
        console.log(err);
      }
    );
  }
}
