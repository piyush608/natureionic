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

  getDetails(_id) {
    return this.http.get(environment.FORUM_URL + "/getDetails/" + _id);
  }

  getRandom() {
    return this.http.get(environment.FORUM_URL + "/random");
  }

  getLatest() {
    return this.http.get(environment.FORUM_URL + "/latest");
  }

  getAllLatests(skip) {
    return this.http.get(environment.FORUM_URL + "/getAllLatests/" + skip);
  }

  getAllTrending(skip) {
    return this.http.get(environment.FORUM_URL + "/getAllTrending/" + skip);
  }

  submitComment(_id, comment) {
    return this.http.post(
      environment.FORUM_URL + "/addComment/" + _id,
      comment
    );
  }
}
