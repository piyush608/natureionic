import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-group-card",
  templateUrl: "./group-card.component.html",
  styleUrls: ["./group-card.component.scss"]
})
export class GroupCardComponent implements OnInit {
  @Input() group: any;
  public thumbnail: string;

  constructor() {}

  ngOnInit() {
    this.thumbnail = this.group.photos[0].thumb400Url;
  }
}
