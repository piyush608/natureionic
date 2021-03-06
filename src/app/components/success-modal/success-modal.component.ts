import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-success-modal",
  templateUrl: "./success-modal.component.html",
  styleUrls: ["./success-modal.component.scss"]
})
export class SuccessModalComponent implements OnInit {
  @Input() _id: string;
  @Input() type: string;

  constructor(public router: Router, public modalCtrl: ModalController) {}

  ngOnInit() {}

  goto() {
    if (this.type === "blog" || this.type === "vlog") {
      this.router.navigateByUrl("/profile");
    } else {
      this.router.navigateByUrl("/view/" + this.type + "/" + this._id);
    }
  }
}
