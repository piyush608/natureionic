import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-business-card",
  templateUrl: "./business-card.component.html",
  styleUrls: ["./business-card.component.scss"]
})
export class BusinessCardComponent implements OnInit {
  @Input() business: any;
  public thumbnail: string;

  constructor() {}

  ngOnInit() {
    this.thumbnail = this.business.photos[0].thumb400Url;
  }
}
