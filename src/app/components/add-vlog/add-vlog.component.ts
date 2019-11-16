import { Component, OnInit } from "@angular/core";
import { Vlog } from "src/app/models/vlog.model";
import { LoadingController, ModalController } from "@ionic/angular";
import { SuccessModalComponent } from "../success-modal/success-modal.component";
import { VlogService } from "src/app/services/vlog.service";

@Component({
  selector: "app-add-vlog",
  templateUrl: "./add-vlog.component.html",
  styleUrls: ["./add-vlog.component.scss"]
})
export class AddVlogComponent implements OnInit {
  public vlog = new Vlog();
  public loader: any;

  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private angVlog: VlogService
  ) {}

  ngOnInit() {}

  addVlog() {
    this.presentLoading();

    this.angVlog.create(this.vlog).subscribe(
      res => {
        this.vlog = res["newVlog"];

        this.dismissLoading();
        this.presentModal();
      },
      err => {
        console.log(err);
      }
    );
  }

  async presentLoading() {
    this.loader = await this.loadingController.create({
      message: "Please wait"
    });
    await this.loader.present();
  }

  async dismissLoading() {
    await this.loader.dismiss();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {
        _id: this.vlog._id,
        type: "vlog"
      }
    });
    return await modal.present();
  }
}
