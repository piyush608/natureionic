import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AlertController } from "@ionic/angular";
import { TextModalComponent } from "src/app/modals/text-modal/text-modal.component";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  public buttonText: string = "Change Email";
  public confirmed: boolean = false;
  public user = {
    email: "",
    newEmail: "",
    password: ""
  };

  constructor(
    private angUser: UserService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.angUser.getEmail().subscribe(
      res => {
        this.user.email = res["user"].email;
        this.user.newEmail = res["user"].email;
      },
      err => {
        console.log(err);
      }
    );
  }

  confirm() {
    if (this.confirmed === false) {
      this.confirmed = true;
      this.buttonText = "Confirm";
    } else {
      this.angUser.changeEmail(this.user).subscribe(
        res => {
          this.presentAlert();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "Please confirm your email address"
    });

    await alert.present();
  }
}
