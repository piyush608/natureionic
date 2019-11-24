import { Component, OnInit } from "@angular/core";
import { ForumService } from "src/app/services/forum.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.scss"]
})
export class CommunityComponent implements OnInit {
  constructor(private angForum: ForumService, private router: Router) {}

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

  addForum() {
    this.router.navigateByUrl("/add/forum");
  }
}
