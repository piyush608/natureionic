import { Component, Input, OnInit } from '@angular/core';
import { Hashtag } from '../../models/hashtag.model';

@Component({
  selector: 'search-forum-card',
  templateUrl: 'search-forum-card.html'
})
export class SearchForumCardComponent implements OnInit {
  @Input('hashId') hashTagId = new Hashtag();
  public forum = [];
  public flag: boolean = true;

  constructor() {
  }

  ngOnInit() {}
}