import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-explore-forum",
  templateUrl: "./explore-forum.component.html",
  styleUrls: ["./explore-forum.component.scss"]
})
export class ExploreForumComponent implements OnInit {
  public forums = [];

  constructor(private angForum: ForumService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.params.type === "latest") {
      this.angForum.getAllLatests("0").subscribe(
        res => {
          this.forums = res["forums"];
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.angForum.getAllTrending("0").subscribe(
        res => {
          this.forums = res["forums"];
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
