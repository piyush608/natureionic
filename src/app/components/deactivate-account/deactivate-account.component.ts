import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-deactivate-account",
  templateUrl: "./deactivate-account.component.html",
  styleUrls: ["./deactivate-account.component.scss"]
})
export class DeactivateAccountComponent implements OnInit {
  constructor(
    private angUser: UserService,
    private alertController: AlertController,
    private angAuth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  deactivateAccount() {
    this.angUser.deactivateAccount().subscribe(
      res => {
        this.presentAlertConfirm();
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: "Your account has been deactivated.",
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.angAuth.logout();
            this.router.navigateByUrl("/login");
          }
        }
      ]
    });

    await alert.present();
  }
}
