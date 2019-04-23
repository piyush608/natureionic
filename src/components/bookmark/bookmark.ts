import { Component, Input } from '@angular/core';

@Component({
  selector: 'bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkComponent {

  @Input('flag') flag: boolean;

  constructor() {
  }

}
