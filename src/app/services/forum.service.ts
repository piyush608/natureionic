import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ForumService {
  constructor(private http: HttpClient) {}

  getRandom() {
    return this.http.get(environment.FORUM_URL + "/random");
  }

  getLatest() {
    return this.http.get(environment.FORUM_URL + "/latest");
  }
}
