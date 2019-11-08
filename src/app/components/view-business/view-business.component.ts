import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "src/app/models/business.model";

@Component({
  selector: "app-view-business",
  templateUrl: "./view-business.component.html",
  styleUrls: ["./view-business.component.scss"]
})
export class ViewBusinessComponent implements OnInit {
  public business = new Business();
  public viewedPhoto: any;
  public mapImage: any;

  constructor(
    private route: ActivatedRoute,
    private angBusiness: BusinessService
  ) {}

  ngOnInit() {
    this.angBusiness.getDetails(this.route.snapshot.params._id).subscribe(
      res => {
        this.business = res["business"];
        this.viewedPhoto = this.business.photos[0].thumb400Url;
        this.mapImage =
          "http://maps.google.com/maps/api/staticmap?center=" +
          this.business.location._lat +
          "," +
          this.business.location._long +
          "&markers=size:small|" +
          this.business.location._lat +
          "," +
          this.business.location._long +
          "&zoom=15&size=312x312&key=AIzaSyDgsEC3C4fI6Otn-LJLs2SzySnYp91hHQU";
      },
      err => {
        console.log(err);
      }
    );
  }

  changePhoto(URL) {
    this.viewedPhoto = URL;
  }
}
