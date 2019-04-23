import { Component, Input } from '@angular/core';

@Component({
  selector: 'mian-header',
  templateUrl: 'mian-header.html'
})
export class MianHeaderComponent {
  @Input('text') text: string;
  constructor() {
  }
}
