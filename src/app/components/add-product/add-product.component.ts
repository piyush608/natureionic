import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent
    });
    return await modal.present();
  }
}
