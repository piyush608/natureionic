import { Component, Input } from '@angular/core';
import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'user-location',
  templateUrl: 'user-location.html'
})
export class UserLocationComponent {
  @Input('zipcode') zipcode: number;
  loc;
  constructor(private angLocation: LocationProvider) {
  }

  ngOnInit() {
    this.angLocation.getLocationFromZipcode(this.zipcode).then(data => {
      this.loc = data;
    });
  }
}