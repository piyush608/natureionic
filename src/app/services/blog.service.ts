import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getRandom() {
    return this.http.get(environment.BLOG_URL + "/random");
  }

  getUserBlogs(_id) {
    return this.http.get(environment.BLOG_URL + "/getUserBlogs/" + _id);
  }
}
