import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-group-card",
  templateUrl: "./group-card.component.html",
  styleUrls: ["./group-card.component.scss"]
})
export class GroupCardComponent implements OnInit {
  @Input() group: any;
  public thumbnail: string;

  constructor(public router: Router) {}

  ngOnInit() {
    this.thumbnail = this.group.photos[0].thumb400Url;
  }

  openGroup() {
    this.router.navigateByUrl("/view/group/" + this.group._id);
  }
}
