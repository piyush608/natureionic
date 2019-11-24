import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {
  public randomForums = [];
  public latestForums = [];

  constructor(private angForum: ForumService, private router: Router) {}

  ngOnInit() {
    this.angForum.getRandom().subscribe(
      res => {
        this.randomForums = res["forums"];
      },
      err => {
        console.log(err);
      }
    );

    this.angForum.getLatest().subscribe(
      res => {
        this.latestForums = res["forums"];
      },
      err => {
        console.log(err);
      }
    );
  }

  addForum() {
    this.router.navigateByUrl("/add/forum");
  }
}
