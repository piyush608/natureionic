import { Component, Input } from '@angular/core';

@Component({
  selector: 'business-list',
  templateUrl: 'business-list.html'
})
export class BusinessListComponent {
  @Input('business') business: any;
  url: string = 'assets/imgs/default_image_company.png';

  constructor() {
  }
}