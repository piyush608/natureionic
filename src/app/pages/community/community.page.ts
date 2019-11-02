import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";

@Component({
  selector: "app-community",
  templateUrl: "./community.page.html",
  styleUrls: ["./community.page.scss"]
})
export class CommunityPage implements OnInit {
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
