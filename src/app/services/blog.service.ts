import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class BlogService {
  constructor(private http: HttpClient) {}

  addBlog(blog) {
    return this.http.post(environment.BLOG_URL + "/create", blog);
  }

  update(_id, blog) {
    return this.http.patch(environment.BLOG_URL + "/update/" + _id, blog);
  }

  getRandom() {
    return this.http.get(environment.BLOG_URL + "/random");
  }

  getPopular() {
    return this.http.get(environment.BLOG_URL + "/getPopular");
  }

  getUserBlogs(_id) {
    return this.http.get(environment.BLOG_URL + "/getUserBlogs/" + _id);
  }
}
