import { Component, Input } from '@angular/core';

@Component({
  selector: 'section-header',
  templateUrl: 'section-header.html'
})
export class SectionHeaderComponent {
  @Input('text') text: string;
  constructor() {
  }
}
