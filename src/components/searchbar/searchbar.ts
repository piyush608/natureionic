import { Component, Input } from '@angular/core';

@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.html'
})
export class SearchbarComponent {
  @Input('input') text?: string;

  constructor() {
  }

  ngOnInit() {
    const inputs: any = document.getElementById("input").getElementsByTagName("INPUT");
    inputs[0].disabled=true;
  }

}
