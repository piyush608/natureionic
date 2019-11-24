import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ForumService {
  constructor(private http: HttpClient) {}

  create(forum) {
    return this.http.post(environment.FORUM_URL + "/create", forum);
  }

  update(_id, forum) {
    return this.http.patch(environment.FORUM_URL + "/update/" + _id, forum);
  }

  getRandom() {
    return this.http.get(environment.FORUM_URL + "/random");
  }

  getLatest() {
    return this.http.get(environment.FORUM_URL + "/latest");
  }
}
