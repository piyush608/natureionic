import { Component, OnInit } from "@angular/core";
import { FeedbackService } from "src/app/services/feedback.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
  public feedback = {
    feedback: "",
    type: "report"
  };

  constructor(
    private angFeedback: FeedbackService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  submitReport() {
    this.angFeedback.create(this.feedback).subscribe(
      res => {
        this.presentAlert();
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: "We have recieved your message. We'll get back to you soon."
    });

    await alert.present();
  }
}
