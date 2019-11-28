import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-business-card",
  templateUrl: "./business-card.component.html",
  styleUrls: ["./business-card.component.scss"]
})
export class BusinessCardComponent implements OnInit {
  @Input() business: any;
  public thumbnail: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.thumbnail = this.business.photos[0].thumb400Url;
  }

  openBusiness() {
    this.router.navigateByUrl("/view/business/" + this.business._id);
  }
}
