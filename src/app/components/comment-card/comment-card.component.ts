import { Component, OnInit, Input } from "@angular/core";
import { LocationService } from "src/app/services/location.service";

@Component({
  selector: "app-comment-card",
  templateUrl: "./comment-card.component.html",
  styleUrls: ["./comment-card.component.scss"]
})
export class CommentCardComponent implements OnInit {
  @Input() comment: any;
  public addedUserImage: string;
  public userLocation: any;

  constructor(private angLocation: LocationService) {}

  ngOnInit() {
    if (this.comment.addedBy.photo.length > 0) {
      this.comment.addedBy.photo.forEach(photo => {
        this.addedUserImage = photo.image.thumb200Url;
      });
    } else {
      this.addedUserImage =
        "https://ui-avatars.com/api/?name=" +
        this.comment.addedBy.name.split(" ").join("+");
    }

    this.angLocation
      .getLocationFromZipcode(this.comment.addedBy.zipcode)
      .then(location => {
        this.userLocation = location;
      });
  }
}
