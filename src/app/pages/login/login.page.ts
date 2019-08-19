import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { PlatformService } from "src/app/services/platform.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public user = new User();
  private isApp: boolean;

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
        this.angAuth.setToken(res["token"].token);
        this.angAuth.loggedIn.next(true);
        this.router.navigateByUrl("/home");
      },
      err => {
        console.log(err);
      }
    );
  }
}
