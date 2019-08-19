import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public user = new User();

  constructor(private angAuth: AuthService, private router: Router) {}

  ngOnInit() {}

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
