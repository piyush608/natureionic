import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {
  constructor(private angForum: ForumService) {}

  ngOnInit() {
    this.angForum.getRandom().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.angForum.getLatest().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
