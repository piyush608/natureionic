import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'profile-image',
  templateUrl: 'profile-image.html'
})
export class ProfileImageComponent {
  @Input('src') src: string;

  constructor(
    private _DomSanitizationService: DomSanitizer
  ) {
  }
}
