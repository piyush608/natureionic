import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public isLoggedIn: boolean = false;
  public isApp: boolean;

  constructor(private platform: Platform, private angAuth: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.angAuth.loggedIn.subscribe(
        res => {
          this.isLoggedIn = res;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
