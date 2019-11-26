import { Component, OnInit } from "@angular/core";
import { VlogService } from "src/app/services/vlog.service";

@Component({
  selector: "app-explore-vlog",
  templateUrl: "./explore-vlog.component.html",
  styleUrls: ["./explore-vlog.component.scss"]
})
export class ExploreVlogComponent implements OnInit {
  public vlogs = [];

  constructor(private angVlog: VlogService) {}

  ngOnInit() {
    this.angVlog.getAll("0").subscribe(
      res => {
        this.vlogs = res["vlogs"];
      },
      err => {
        console.log(err);
      }
    );
  }
}
