import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Platform } from "@ionic/angular";
import { PlatformService } from "src/app/services/platform.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public user = new User();

  constructor(
    private platform: Platform,
    private angPlatform: PlatformService,
    private angAuth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    document.URL.indexOf("http") !== 0
      ? (this.user.deviceType = "App")
      : (this.user.deviceType = "PWA");
    this.user.device = this.platform.platforms()[0];

    if (this.user.deviceType === "PWA")
      this.user.browser = this.angPlatform.getBrowserInfo();
  }

  signup() {
    this.angAuth.signup(this.user).subscribe(
      res => {
        this.angAuth.setPendingToken(res["token"]);
        this.router.navigateByUrl("/onboarding");
      },
      err => {
        console.log(err);
      }
    );
  }
}
