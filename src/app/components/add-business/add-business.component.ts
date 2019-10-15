import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";

@Component({
  selector: "app-add-business",
  templateUrl: "./add-business.component.html",
  styleUrls: ["./add-business.component.scss"]
})
export class AddBusinessComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent
    });
    return await modal.present();
  }
}
