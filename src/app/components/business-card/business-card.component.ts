import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-business-card",
  templateUrl: "./business-card.component.html",
  styleUrls: ["./business-card.component.scss"]
})
export class BusinessCardComponent implements OnInit {
  @Input() business: any;
  public thumbnail: string;
  public isBookmarked: boolean = false;

  constructor(private router: Router, private storage: Storage) {}

  ngOnInit() {
    this.thumbnail = this.business.photos[0].thumb400Url;

    this.storage.get("user").then(user => {
      if (
        user.bookmarkedBusinesses.findIndex(
          index => index === this.business._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });
  }

  openBusiness() {
    this.router.navigateByUrl("/view/business/" + this.business._id);
  }
}
