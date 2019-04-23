import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'recipe-business',
  templateUrl: 'recipe-business.html'
})
export class RecipeBusinessComponent {
  @Input('business') business: any;

  constructor(public navCtrl: NavController) {
  }

  openBusiness() {
    this.navCtrl.push('business-page', { _id: this.business._id });
  }
}