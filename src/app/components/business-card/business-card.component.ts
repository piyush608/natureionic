import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-business-card",
  templateUrl: "./business-card.component.html",
  styleUrls: ["./business-card.component.scss"]
})
export class BusinessCardComponent implements OnInit {
  @Input() business: any;
  public thumbnail: string;
  private user: any;
  public isBookmarked: boolean = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private angUser: UserService
  ) {}

  ngOnInit() {
    this.thumbnail = this.business.photos[0].thumb400Url;

    this.storage.get("user").then(user => {
      this.user = user;
      if (
        user.bookmarkedBusinesses.findIndex(
          index => index === this.business._id
        ) === -1
      )
        this.isBookmarked = false;
      else this.isBookmarked = true;
    });

    this.angUser.user.subscribe(res => {
      this.user = res;
    });
  }

  openBusiness() {
    this.router.navigateByUrl("/view/business/" + this.business._id);
  }

  bookmark() {
    if (this.isBookmarked === false) {
      this.user.bookmarkedBusinesses.push(this.business._id);
      this.update();
    } else {
      this.user.bookmarkedBusinesses.splice(
        this.user.bookmarkedBusinesses.findIndex(
          index => index === this.business._id
        ),
        1
      );
      this.update();
    }
  }

  update() {
    this.angUser.update(this.user._id, this.user).subscribe(
      res => {
        this.angUser.setUser(this.user);
        this.isBookmarked = !this.isBookmarked;
      },
      err => {
        console.log(err);
      }
    );
  }
}
